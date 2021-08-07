import firebase from "firebase/app";
import { initializeApp } from '../Utils';
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

export const saveRestaurantDetail = async(info)=>{
    try {
        if(info.id===""){
            throw Error("Id Not Provided");
        }
        await db.collection("restaurants").doc(info.id).set({
            name:info.name,
            email:info.email,
            RestaurantName:info.restaurantName,
            country:info.country,
            city:info.city,
            pincode:info.pincode,
            number:info.phone,
            address:info.address
        })
        return;
    } catch (error) {
        console.log(error.message);
    }
}
