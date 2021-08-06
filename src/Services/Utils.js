import dotenv from 'dotenv'
import firebase from "firebase/app";
import '@firebase/database'
import "firebase/firestore";
dotenv.config();

const db = firebase.firestore();

export const initializeApp = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp({
            apiKey: process.env.REACT_APP_API_KEY,
            authDomain: process.env.REACT_APP_AUTH_DOMAIN,
            projectId: process.env.REACT_APP_PROJECT_ID,
            storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
            messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
            appId: process.env.REACT_APP_APP_ID,
        });
    }
}

export const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("Sign out successfully");
      })
      .catch((error) => {
        console.log("Error Occured While signing out!!");
        console.log(error.message);
      });
};

export const isUser = async(id)=>{
    const userRef = await db.collection("users").doc(id).get();
    return userRef.exists;
}

export const isRestaurent = async(id)=>{
    const restaurentRef = await db.collection("restaurants").doc(id).get();
    return restaurentRef.exists;
}