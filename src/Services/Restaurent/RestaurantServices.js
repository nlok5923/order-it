import firebase from "firebase/app";
import { initializeApp } from '../Utils';
import { getImageUrl, deleteImage } from "./Dish"
import "firebase/auth";
import '@firebase/database'
import "firebase/firestore";

initializeApp();
var user;
const db = firebase.firestore();

export const getRestaurants = async() => {
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
        for (let i = 0; i < data.length; i++) {
            // let imageUrl = await getImageUrl("restaurants", data[i].fileName);
            // data[i].firebaseImage = imageUrl;
            let imageUrl = [];
            if (data[i].fileNames) {
                data[i].fileNames.map(async name => {
                    let image = await getImageUrl("restaurants", name);
                    imageUrl.push(image)
                });
                data[i].firebaseImages = [...imageUrl];
            }
        }
        return data;
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}

const giveWord = (text)=>{
    let tem_word = "";
    let words = new Set();
    for(let ch of text){
        if(ch===' '){
            words.add(tem_word.toLowerCase());
            tem_word = "";
        }else{
            tem_word +=ch;
        }
    }
    if(tem_word!==""){
        words.add(tem_word.toLowerCase());
    }
    return  Array.from(words);
}

const minv = (a,b)=>{
    return a<b?a:b;
}

const findWord = (word,haystack)=> {
    var high = haystack.length - 1;
    var low = 0;
    let wordLength = word.length;
    while (low <= high) {
        let mid = parseInt((low + high) / 2);
        let len = minv(haystack[mid].length,wordLength);
        var element = haystack[mid].substr(0,len);
        var tem_word = word.substr(0,len);
        if (element > tem_word) {
            high = mid - 1;
        } else if (element < tem_word) {
            low = mid + 1;
        } else {
            return true;
        }
    }
    return false;
}

export const searchRestaurants =async (pinCode,searchText)=>{
    try {
        let data = [];
        let ref;
        if(pinCode==="xxx"){
            ref = await db.collection("restaurants").get();
        }else{
            ref = await db.collection("restaurants").where("pincode","==",pinCode).get();
        }
        if(searchText==="no"){
            ref.forEach((doc) => {
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
        }else{
            let words = giveWord(searchText);
            let restaurants = [];
            ref.forEach((doc)=>{
                restaurants.push({
                    id:doc.id,
                    searchKeyWord:doc.data().searchWord
                })
            })
            let presentRes = [],notPresentRes = [];
            for(let restaurant of restaurants){
                let flag = true;
                for(let word of words){
                    if(!findWord(word,restaurant.searchKeyWord)){
                        flag = false;break;
                    }
                }
                if(!flag){
                    notPresentRes.push(restaurant.id);
                }else{
                    presentRes.push(restaurant.id);
                }
            }
            for(let id of notPresentRes){
                let dishRef = await db.collection("restaurants").doc(id).collection("dishes").get();
                let searchKeyWord = [];
                dishRef.forEach((doc)=>{
                    searchKeyWord.push(doc.data().searchWord);
                })
                for(let dishWord of searchKeyWord){
                    let flag = true;
                    for(let word of words){
                        if(!findWord(word,dishWord)){
                            flag = false;break;
                        }
                    }
                    if(flag){
                        presentRes.push(id);
                        break;
                    }
                }
            }
            for(let id of presentRes){
                let resRef = await db.collection("restaurant").doc(id).get();
                data.push({
                    RestaurantName: resRef.data().RestaurantName,
                    country: resRef.data().country,
                    city: resRef.data().city,
                    pincode: resRef.data().pincode,
                    address: resRef.data().address,
                    phone: resRef.data().phone,
                    restaurantId: resRef.id
                    // description: data.resRef().description
                })
            }
        }
    } catch (error) {
        console.log(error.message);
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
                dishId: doc.id,
                uid: id
            })
        })
        for (let i = 0; i < data.length; i++) {
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
    } catch (err) {
        console.log(err.message);
        return err.message;
    }
}

export const getRestaurantImagesUrl = async (id) => {
    try {
        let imageLocation = [];
        let imageUrl = [];
        let ref = await db.collection("restaurants").doc(id).get();
        let fileNames = ref.data().fileNames;
        for(let i=0;i<fileNames.length;i++){
            let url = await getImageUrl("restaurants",fileNames[i]);
            imageUrl.push(url);
        }
        console.log(imageUrl);
        return imageUrl;
    } catch (err) {
        console.log(err.message);
        return err.message;
    }
}


export const deleteDish = async (restId, dishId, filename) => {
    try {
        await db.collection("restaurants").doc(restId).collection("dishes").doc(dishId).delete();
        await deleteImage(filename, "restaurants");
    } catch (err) {
        console.log(err.message);
        return err.message;
    }
};