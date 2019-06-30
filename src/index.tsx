import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Login from './pages/Login';
import Queue from './pages/Queue';
import Join from './pages/Join';
import Home from './pages/Home';
import Item from './pages/Item';
import ConsumeVoucher from "./pages/ConsumeVoucher";
import BloodDonation from './pages/BloodDonation';
import * as serviceWorker from './serviceWorker';
import defaultTheme from './theme';
import './index.css';

const App = () => (
  <MuiThemeProvider theme={defaultTheme}>
    <Router>
      <React.Fragment>
        <Route exact path="/" component={Login} />
        <Route path="/participar" component={Queue} />
        <Route path="/entrar" component={Join} />
        <Route path="/vouchers" component={Home} />
        <Route path="/item/:id" component={Item} />
        <Route path="/perfil" component={Home} />
        <Route path="/comprovante" component={BloodDonation} />
        <Route path="/empresarial/voucher" component={ConsumeVoucher} />
        <Route path="/aprenda" component={Home} />
      </React.Fragment>
    </Router>
  </MuiThemeProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
