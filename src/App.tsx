
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Container from './components/container';
import ThemeProvider from './components/theme';
import Provider from './context';
import Reducer, { initialValue } from './context/reducer';
import Home from './pages/home';
import List from './pages/list';
import NotFound from './pages/notFound';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <Provider
          initialValue={initialValue}
          reducer={Reducer}
        >
          <Container>
            <Switch>
              <Route
                exact
                path={"/"}
                component={Home}
              />
              <Route
                exact
                path={"/explore"}
                component={List}
              />
              <Route
                component={NotFound}
              />
            </Switch>
          </Container>
        </Provider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
