import firebase from "firebase/app";
import {initializeApp} from '../Utils';
import "firebase/auth";
initializeApp();
export const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
var user;
export const signInWithGoogle = () => {
  auth
    .signInWithPopup(provider)
    .then((result) => {
      // var credential = result.credential;
      // This gives you a Google Access Token. You can use it to access the Google API.
      // var token = credential.accessToken;
      // The signed-in user info.
      console.log(result.additionalUserInfo.isNewUser)
      user = result.user;
      console.log(user);
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      // var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      // var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      // var credential = error.credential;
      console.log(errorMessage);
    });
};

