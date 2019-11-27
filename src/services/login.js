import firebase from 'firebase';

export function isLogin() {
    const user = firebase.auth().currentUser;
    return user;
}