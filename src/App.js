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
    this.props.toggleLoader(true);
    firebase.auth().onAuthStateChanged(authUser => {
      this.setState({ user: authUser });
      this.props.toggleLoader(false);
    })
  }

  renderContent =() => (
    this.state.user ?
      <MainView />
      : <LoginView />
  )

  render() {
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