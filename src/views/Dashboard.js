import React from 'react';
import { DropzoneComponent } from '../components/dropzone/Dropzone';
import firebase from 'firebase';
import { Container } from '@material-ui/core';
import { HeaderBar } from '../components/headerBar/HeaderBar';

export class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null
    }
  }

  logOut = () => {
    firebase.auth().signOut().then(function () {
      this.props.history.push("/signin");
    }).catch(function (error) {
      // An error happened.
    });
  }

  componentDidMount() {
    const user = firebase.auth().currentUser;

    this.setState({
      userData: {
        photoURL: user.photoURL,
        name: user.displayName,
        email: user.email
      }
    })
  }

  updateProfile = () => {
    var user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: "Дмитрий Соколовский",
      photoURL: "https://sun9-57.userapi.com/c854024/v854024325/91a99/_0J5_rCd44Y.jpg"
    }).then(function () {
      this.props.history.push("/signin");
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
              <HeaderBar user={userData} onLogOut={this.logOut} />
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