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

export const getUserCart = async (uid) => {
    try {
        let cartItems = [];
        let cartRef = await db.collection("users").doc(uid).collection("cart").get();
        cartRef.forEach(data => {
            cartItems.push({
                dishId:data.data().dishId,
                quantity:data.data().quantity,
                restaurantId:data.data().restaurantId,
                itemId:data.id
            });
        })
        return cartItems;
    } catch(err) {
        console.log(err.message);
        throw err;
    }
}


export const getCartItem = async (restId, id) => {
    try {
        let ref = await db.collection("restaurants").doc(restId);
        let tem_ref = await ref.get();
        let cartRef = await ref.collection("dishes").doc(id).get();
        let data = cartRef.data();
        let price = parseInt(cartRef.data().price);
        let discount = parseInt(cartRef.data().discount);
        let discountedPrice = parseInt(price - price*discount/100);
        data.discountedPrice = discountedPrice;
        data.restaurantName = tem_ref.data().RestaurantName;
        return data;
    } catch(err) {
        console.log(err.message);
        throw err;
    }
}

export const deleteCartItem = async (userid, id) => {
    try {
        console.log(userid,id);
        await db.collection("users").doc(userid).collection("cart").doc(id).delete()
        .then(data => console.log("deleted", data))
    } catch(err) {
        console.log(err.message);
        throw err;
    }
}

export const placeOrder = async(userId,shippingDetail,items)=>{
    try {
        items.sort((a,b)=>a.restaurantId - b.restaurantId)

    } catch (error) {
        console.log(error.message);
    }
}