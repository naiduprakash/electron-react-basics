import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { render } from 'react-dom';
import theme from './helpers/theme';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Routes from './routes/routes';

const Theme = extendTheme(theme);
render(
  <Router>
    <ChakraProvider theme={Theme}>
      <Routes />
    </ChakraProvider>
  </Router>,
  document.getElementById('app')
);
