import React from 'react';
import { DropzoneComponent } from '../components/dropzone/Dropzone';
import firebase from 'firebase';
import db from '../services/db';
import { Container } from '@material-ui/core';
import { HeaderBar } from '../components/headerBar/HeaderBar';

export class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null
    }

    firebase.auth().onAuthStateChanged(user => {
      const userData = {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      }

      this.setState({
        userData
      });
    });
  }

  componentDidMount() {
    db.find({}, (err, res) => {
      firebase.auth().signInWithEmailAndPassword(res[0].email, res[0].password).then(res => {
        console.log(res);
        // this.updateProfile();
      });
    });
  }

  updateProfile = () => {
    var user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: "Дмитрий Соколовский",
      photoURL: "https://sun9-57.userapi.com/c854024/v854024325/91a99/_0J5_rCd44Y.jpg"
    }).then(function () {
      // Update successful.
    }).catch(function (error) {
      // An error happened.
    });
  }

  render() {
    const { userData } = this.state;

    return (
      <React.Fragment>
        {
          userData && (
            <React.Fragment>
            <HeaderBar user={userData} />
            <Container fixed>
              <h1>Hello</h1>
              <h1>{this.state.userData && this.state.userData.displayName}</h1>
              <DropzoneComponent />
            </Container>
            </React.Fragment>
          )
        }

      </React.Fragment>

    );
  }

}