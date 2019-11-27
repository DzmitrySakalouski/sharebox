import React from 'react';
import './App.css';
import { MainView } from './views/Dashboard';
import { BrowserRouter, Switch } from 'react-router-dom';
import PublicRoute from './components/routes/PublicRpoute';
import PrivateRoute from './components/routes/PrivateRoute';
import LoginView from './views/LoginView';
import firebase from 'firebase';
import config from './Firebase';

class App extends React.Component {
  constructor(props) {
    super(props);
    firebase.initializeApp(config);
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <PublicRoute restricted={false} component={LoginView} exact path="/signin" />
          <PrivateRoute restricted={false} component={MainView} exact path="/" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
