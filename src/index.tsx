import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Login from './pages/Login';
import Queue from './pages/Queue';
import * as serviceWorker from './serviceWorker';
import defaultTheme from './theme';
import './index.css';

const App = () => (
  <MuiThemeProvider theme={defaultTheme}>
    <Router>
      <React.Fragment>
        <Route exact path="/" component={Login} />
        <Route path="/participar" component={Queue} />
      </React.Fragment>
    </Router>
  </MuiThemeProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
