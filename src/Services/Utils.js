import dotenv from 'dotenv'
import firebase from "firebase/app";
import '@firebase/database'
import "firebase/firestore";
dotenv.config();

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

initializeApp();
const db = firebase.firestore();

export const signOut = () => {
    initializeApp();
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

export const getAmountSum = (items) => {
    let amount = 0;
    items.map(item => amount += (item.data.discountedPrice * item.quantity));
    return amount;
}

export const getDiscountedPrice = (money, off) => {
    let price = parseInt(money);
    let discount = parseInt(off);
    let discountedPrice = parseInt(price - price*discount/100);
    return discountedPrice;
}