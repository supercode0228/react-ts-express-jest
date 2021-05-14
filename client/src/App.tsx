import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { mainReducer, defaultState } from './reducers';
import thunk from 'redux-thunk';

import {createMuiTheme, MuiThemeProvider, withStyles, createStyles, WithStyles} from '@material-ui/core';
import {AccountStatus} from './pages';

const store = createStore(mainReducer, defaultState(), applyMiddleware(thunk));

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "white",
      main: "#029E74",
      dark: "rgba(0,0,0,0.3)",
    },
    secondary: {
      light: "white",
      main: "#42BE9D",
      dark: "rgba(0,0,0,0.3)",
    },
  },
  spacing: 4,
});

const styles = createStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: theme.palette.primary.light,
  }
});

const App: React.FunctionComponent<WithStyles<typeof styles>> = props => {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <div className={props.classes.root}>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={AccountStatus} />
            </Switch>
          </BrowserRouter>
        </div>
      </MuiThemeProvider>
    </Provider>
  )
};

export default withStyles(styles)(App);
