import { Switch, Route, HashRouter as Router } from 'react-router-dom';

function HomeRoute() {
  return <h1>Home page</h1>;
}

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="" component={HomeRoute} />
      </Switch>
    </Router>
  );
}
