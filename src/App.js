import React from 'react';
import './App.css';
import { MainView } from './views/Dashboard';
import LoginView from './views/LoginView';
import firebase from 'firebase';
import config from './Firebase';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';
import { toggleLoader } from './store/actions/loader';
import { connect } from 'react-redux';

class App extends React.Component {
  constructor(props) {
    super(props);
    firebase.initializeApp(config);
    this.state = {
      user: null,
    }
  }

  componentDidMount() {
    console.log(this.props, 'app')
    this.props.toggleLoader();
    firebase.auth().onAuthStateChanged(authUser => {
      this.setState({ user: authUser });
      this.props.toggleLoader();
    })
  }

  renderContent =() => (
    this.state.user ?
      <MainView />
      : <LoginView />
  )

  renderLoader = () => {
    return (
      <div style={{ position: 'absolute', top: 0, left: 0, height: "100vh", width: '100vw', display: 'flex', justifyContent: "center", alignItems: "center" }}>
        <Loader type="ThreeDots" color="#somecolor" height={80} width={80} />
      </div>
    );    
  }

  render() {
    if (this.props.isLoading) {
      this.renderLoader();
      return;
    }
    return (
      <div>
        { this.renderContent() }
      </div>
    )
  }
}

const mapStateToProps = state => ({isLoading: state.loader.isLoading});

const mapDispatchToProps = dispatch => ({ toggleLoader });



export default connect(mapStateToProps, mapDispatchToProps)(App);