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
        ref.forEach(async (doc) => {
            data.push({
                RestaurantName: doc.data().RestaurantName,
                country: doc.data().country,
                city: doc.data().city,
                pincode: doc.data().pincode,
                address: doc.data().address,
                phone: doc.data().phone,
                restaurantId: doc.id
                // description: data.doc().description
            })
        })
        for(let i=0;i<data.length;i++) {
            // let imageUrl = await getImageUrl("restaurants", data[i].fileName);
            // data[i].firebaseImage = imageUrl;
            let imageUrl = [];
            if(data[i].fileNames) {
            data[i].fileNames.map(async name => { 
                let image = await getImageUrl("restaurants", name);
                imageUrl.push(image)
            }); 
            data[i].firebaseImages = [...imageUrl];
            }

            console.log(data[i])
        }
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
        ref.forEach((doc) => {
            data.push({
                dishName: doc.data().dishName,
                price: doc.data().price,
                discount: doc.data().discount,
                description: doc.data().description,
                fileName: doc.data().fileName,
                dishId:doc.id,
                uid:id
            })
        })
        for(let i=0;i<data.length;i++){
            let imageUrl = await getImageUrl("dish", data[i].fileName);
            data[i].firebaseImage = imageUrl;
        }
        return data;
      } catch (error) {
          console.log(error.message);
          return error.message;
      }  
 };


 export const getRestaurantInformation = async (id) => {
     try {
         let restaurantData;
         await db.collection("restaurants").doc(id).get().then(data => restaurantData = data.data())
         return restaurantData;
     } catch(err) {
         console.log(err.message);
         return err.message;
     }
}

export const getRestaurantImagesUrl = async (id) => {
    try {
        let imageUrl = [];
    } catch(err){
        console.log(err.message);
        return err.message;
    }
}