import firebase from "firebase/app";
import { initializeApp } from '../Utils';
import "firebase/auth";
import '@firebase/database'
import "firebase/firestore";

initializeApp();
var user;
const db = firebase.firestore();

export const addDishToCart = async (info)=>{
    try {
        const { dishId, uid} = info;
        let dishes  = [];
        let dishRef = await db.collection("users").doc(uid).collection("cart").get();
        dishRef.forEach(dishId => {
            dishes.push(dishId.data());
        })
        console.log(dishes);
        if(dishes.includes(dishId)) {
            return false;
        } else {
        await db.collection("users").doc(uid).collection("cart").add({
            uid,
            dishId
        }); 
        return true; 
    }
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}