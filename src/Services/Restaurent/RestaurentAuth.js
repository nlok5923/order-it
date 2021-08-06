import firebase from "firebase/app";
import {initializeApp} from '../Utils';
import "firebase/auth";
import '@firebase/database'
import "firebase/firestore";

initializeApp();
export const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
var user;
const db = firebase.firestore();

export const signInForRestaurant = () => {
  auth
    .signInWithPopup(provider)
    .then((result) => {
      if(result.additionalUserInfo.isNewUser){
        user = result.user;
        const {email,uid,displayName} = user;
        db.collection("restaurants").doc(uid).set({
          displayName,
          email
        })
      }
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

export const saveRestaurentDetail = async(info)=>{
    try {
        if(!info.id){
            throw Error("Id Not Provided");
        }
        await db.collection("restaurants").doc(info.id).update({
            RestaurentName:info.name,
            country:info.country,
            city:info.city,
            pincode:info.pincode,
            number:info.number,
            address:info.address
        })
        return;
    } catch (error) {
        console.log(error.message);
    }
}
