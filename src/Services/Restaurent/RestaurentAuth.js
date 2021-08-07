import firebase from "firebase/app";
import { initializeApp } from "../Utils";
import "firebase/auth";
import "@firebase/database";
import "firebase/firestore";
import {handleUpload,getFileName,giveSearchWords} from './Shared';

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

export const saveRestaurantDetail = async (info,images) => {
  try {
    if (info.id === "") {
      throw Error("Id Not Provided");
    }
    const {name,email,RestaurantName,country,city,pincode,phone,address,discount,description} = info;
    description.trim();
    name.trim();
    let fileNames = [];

    for(let i=0;i<images.length;i++){
      let name = getFileName();
      await handleUpload(images[i],name,"restaurants");
      fileNames.push(name);
    }

    let searchKeyWord = new Set();
    searchKeyWord = giveSearchWords(RestaurantName,searchKeyWord);
    searchKeyWord = giveSearchWords(description,searchKeyWord);
    let searchWord = Array.from(searchKeyWord).sort();

    await db.collection("restaurants").doc(info.id).set({
      name: name,
      email: email,
      RestaurantName: RestaurantName,
      country: country,
      city: city,
      pincode: pincode,
      number: phone,
      address: address,
      discount,
      description,
      fileNames,
      searchWord
    });
    return;
  } catch (error) {
    console.log(error.message);
  }
};
