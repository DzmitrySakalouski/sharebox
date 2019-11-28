import React from 'react';
import './App.css';
import { MainView } from './views/Dashboard';
import LoginView from './views/LoginView';
import firebase from 'firebase';
import config from './Firebase';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';

class App extends React.Component {
  constructor(props) {
    super(props);
    firebase.initializeApp(config);
    this.state = {
      user: null,
      isLoading: true
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(authUser => {
      this.setState({ user: authUser, isLoading: false });
    })
  }

  renderContent =() => (
    this.state.user ?
      <MainView />
      : <LoginView />
  )

  renderLoader = () => {
    return (
      <div style={{ height: "100vh", display: 'flex', justifyContent: "center", alignItems: "center" }}>
        <Loader type="ThreeDots" color="#somecolor" height={80} width={80} />
      </div>
    );    
  }

  render() {
    const { isLoading } = this.state;

    return (
      <div>
        { isLoading ? this.renderLoader() : this.renderContent() }
      </div>
    )
  }
}

export default App;
