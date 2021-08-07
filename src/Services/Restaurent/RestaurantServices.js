import firebase from "firebase/app";
import { initializeApp } from '../Utils';
import { getImageUrl } from "./Dish"
import "firebase/auth";
import '@firebase/database'
import "firebase/firestore";

initializeApp();
var user;
const db = firebase.firestore();

export const getRestaurants = async () => {
    try {
        let data = [];
        let ref = await db.collection("restaurants").get();  
        ref.forEach((doc) => {
            data.push({
                RestaurantName: doc.data().RestaurantName,
                country: doc.data().country,
                city: doc.data().city,
                pincode: doc.data().pincode,
                address: doc.data().address,
                phone: doc.data().phone,
                // description: data.doc().description
            })
        })
        return data;
      } catch (error) {
          console.log(error.message);
          return error.message;
      }
 }


 export const getRestaurantDishes = async (id) => {
    try {
        let data = [];
        let ref = await db.collection("restaurants").doc(id).collection("dishes").get();  
        ref.forEach(async (doc) => {
            let imageUrl = await getImageUrl("dish", doc.data().fileName);
            let dishInfo = {
                dishName: doc.data().dishName,
                price: doc.data().price,
                discount: doc.data().discount,
                description: doc.data().description,
                firebaseImage: imageUrl
            }
            console.log(dishInfo + " "+ doc.id);
            data.push({
                id: doc.id,
                dishInfo
            })
        })
        return data;
      } catch (error) {
          console.log(error.message);
          return error.message;
      }  
 };