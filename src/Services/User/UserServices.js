import firebase from "firebase/app";
import { initializeApp } from '../Utils';
import "firebase/auth";
import '@firebase/database'
import "firebase/firestore";

initializeApp();
var user;
const db = firebase.firestore();

export const addDishToCart = async (uid, dishId, quantity, restaurantId) => {
    try {
        let dishes  = [];
        let dishRef = await db.collection("users").doc(uid).collection("cart").get();
        dishRef.forEach(data => {
            dishes.push(data.data().dishId);
        })
        console.log(dishes);
        if(dishes.includes(dishId)) {
            return false;
        } else { 
        await db.collection("users").doc(uid).collection("cart").add({
            dishId,
            quantity,
            restaurantId
        }); 
        return true; 
    }
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}