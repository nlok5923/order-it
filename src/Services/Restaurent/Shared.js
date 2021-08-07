import firebase from "firebase/app";
import {initializeApp} from '../Utils';
import "firebase/auth";
import '@firebase/database'
import "firebase/firestore";
import '@firebase/storage';

initializeApp();
const db = firebase.firestore();

export const handleUpload = async (image, fileName, folderName) => {
    await firebase.storage().ref(`${folderName}/${fileName}`).put(image);
}

export const getFileName = () => {
    let fileName = String(Date.now()) + parseInt(Math.random() * 10) + parseInt(Math.random() * 10) + parseInt(Math.random() * 10);
    return fileName;
}

export const giveSearchWords = (text,mySet)=>{
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