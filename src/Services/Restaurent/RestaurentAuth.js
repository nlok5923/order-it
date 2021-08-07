import firebase from "firebase/app";
import { initializeApp } from "../Utils";
import "firebase/auth";
import "@firebase/database";
import "firebase/firestore";

initializeApp();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
var user;
const db = firebase.firestore();

export const signInForRestaurant = () => {
  auth
    .signInWithPopup(provider)
    .then((result) => {
      user = result.user;
      console.log(user.displayName);
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

export const saveRestaurantDetail = async (info) => {
  try {
    if (info.id === "") {
      throw Error("Id Not Provided");
    }
    await db.collection("restaurants").doc(info.id).set({
      name: info.name,
      email: info.email,
      RestaurantName: info.restaurantName,
      country: info.country,
      city: info.city,
      pincode: info.pincode,
      number: info.phone,
      address: info.address,
    });
    return;
  } catch (error) {
    console.log(error.message);
  }
};
