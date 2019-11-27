import React from 'react';
import './App.css';
import { MainView } from './views/Dashboard';
import {BrowserRouter, Switch} from 'react-router-dom';
import PublicRoute from './components/routes/PublicRpoute';
import PrivateRoute from './components/routes/PrivateRoute';
import LoginView from './views/LoginView';

function App() {
  return ( 
    <BrowserRouter>
      <Switch>
        <PublicRoute restricted={false} component={LoginView} exact path="/signin" />
        <PrivateRoute restricted={false} component={MainView} exact path="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
