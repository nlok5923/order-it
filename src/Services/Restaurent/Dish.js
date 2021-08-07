import firebase from "firebase/app";
import {initializeApp} from '../Utils';
import "firebase/auth";
import '@firebase/database'
import "firebase/firestore";
import '@firebase/storage';

initializeApp();
const db = firebase.firestore();

const getImageUrl = async (folderName, fileName) => {
    let url = await firebase.storage().ref(folderName).child(fileName).getDownloadURL();
    return url;
}

const handleUpload = async (image, fileName, folderName) => {
    await firebase.storage().ref(`${folderName}/${fileName}`).put(image);
}

 const getFileName = () => {
    let fileName = String(Date.now()) + parseInt(Math.random() * 10) + parseInt(Math.random() * 10) + parseInt(Math.random() * 10);
    return fileName;
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

const giveSearchWords = (text,mySet)=>{
    let tem_word = "";
    for(let ch of text){
        if(ch===' '){
            mySet.add(tem_word.toLowerCase());
            tem_word = "";
        }else{
            tem_word +=ch;
        }
    }
    if(tem_word!==""){
        mySet.add(tem_word.toLowerCase());
    }
    return mySet;
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