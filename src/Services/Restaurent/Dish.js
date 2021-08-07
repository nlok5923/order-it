import firebase from "firebase/app";
import {initializeApp} from '../Utils';
import "firebase/auth";
import '@firebase/database'
import "firebase/firestore";
import '@firebase/storage';
import {handleUpload,getFileName,giveSearchWords} from './Shared'

initializeApp();
const db = firebase.firestore();

const getImageUrl = async (folderName, fileName) => {
    let url = await firebase.storage().ref(folderName).child(fileName).getDownloadURL();
    return url;
}

const deleteImage = async (img, folderName) => {
    // Create a reference to the file to delete
    var imageRef = firebase.storage().ref(folderName).child(img);
    // Delete the file
    try {
    await imageRef.delete(); 
    } catch(err) {
        console.log("Error while deleting images", err);
        return err.message;
    }
    console.log("Image Deleted Successfully")
}

export const addDish = async(info)=>{
    try {
        const {dishName,price,discount,description,image,uid} = info;
        let fileName = getFileName();
        await handleUpload(image,fileName,"dish");
        let searchKeyWord = new Set();
        dishName.trim();
        description.trim();
        searchKeyWord = giveSearchWords(dishName,searchKeyWord);
        searchKeyWord = giveSearchWords(description,searchKeyWord);
        let searchWord = Array.from(searchKeyWord).sort();
        await db.collection("restaurants").doc(uid).collection("dishes").add({
            dishName,
            price,
            discount,
            description,
            fileName,
            searchWord
        })
        return;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

export const editDish = async(info)=>{
    try {
        const {dishName,price,discount,description,image,uid} = info;
        let fileName = getFileName();
        await handleUpload(image,fileName,"dish");
        let searchKeyWord = new Set();
        dishName.trim();
        description.trim();
        searchKeyWord = giveSearchWords(dishName,searchKeyWord);
        searchKeyWord = giveSearchWords(description,searchKeyWord);
        let searchWord = Array.from(searchKeyWord).sort();
        await db.collection("restaurants").doc(uid).collection("dishes").add({
            dishName,
            price,
            discount,
            description,
            fileName,
            searchWord
        })
        return;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}