const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const electron = require('electron');
const { autoUpdater } = require('electron-updater');

const isDev = !app.isPackaged;

const createWindow = () => {
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
  const mainWindow = new BrowserWindow({
    width: Math.max(1200, width),
    height: Math.max(700, height),
    minWidth: 600,
    minHeight: 600,
    maxWidth: width,
    maxHeight: height,
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  const localUrl = 'http://localhost:3001';
  const buildUrl = new URL('file://' + path.join(__dirname, '/../build/index.html')).href;
  // load the index.html of the app.
  const startUrl = isDev ? localUrl : buildUrl;
  console.log(buildUrl);
  mainWindow.loadURL(startUrl);

  mainWindow.once('ready-to-show', () => {
    autoUpdater.checkForUpdatesAndNotify();
  });
  mainWindow.webContents.openDevTools({ mode: 'bottom' });
  
  ipcMain.on('app_version', (event) => {
    event.sender.send('app_version', { version: app.getVersion() });
  });

  autoUpdater.on('update-available', () => {
    mainWindow.webContents.send('update_available');
  });

  autoUpdater.on('update-downloaded', () => {
    mainWindow.webContents.send('update_downloaded');
  });

  ipcMain.on('restart_app', () => {
    autoUpdater.quitAndInstall();
  });
};

app.whenReady().then(() => {
  createWindow();

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
