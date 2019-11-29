import React from 'react';
import firebase from 'firebase';
import { HeaderBar } from '../components/headerBar/HeaderBar';
import { BrowserRouter } from 'react-router-dom';
import { Home } from '../components/home/home';

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

  componentDidMount = () => {
    const user = firebase.auth().currentUser;

    this.setState({
      userData: {
        photoURL: user.photoURL,
        name: user.displayName,
        email: user.email
      }
    });
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
    const {classes} = this.props;

    return (
      <div>
        {
          userData && (
            <BrowserRouter>
              <HeaderBar user={userData} onLogOut={this.logOut} />
              <Home />
            </BrowserRouter>
          )
        }
      </div>
    );
  }

}
