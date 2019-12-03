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
    const db = firebase.firestore();
    // db.collection('tracks').onSnapshot(doc => {
    //   doc.docChanges().forEach(item => {
    //     console.log("++++++++++++", item.data()})
    //   )
    // });

    // db.collection('tracks').onSnapshot(snapshot => {
    //   snapshot.docChanges().forEach(element => {
    //     if (element.type === "added") {
    //       console.log("New city: ", element);
    //   }
    //   if (element.type === "modified") {
    //       console.log("Modified city: ", element);
    //   }
    //   if (element.type === "removed") {
    //       console.log("Removed city: ", element);
    //   }
    //   });
    // })

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
