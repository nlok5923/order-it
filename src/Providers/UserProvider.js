import { useState, useEffect, createContext } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import {initializeApp} from '../Services/Utils';
import {isUser,isRestaurent } from '../Services/Utils'

initializeApp();
const auth = firebase.auth();

export const UserContext = createContext({
  info: { user: null, isLoading: true },
});

const UserProvider = (props) => {
  const [info, setInfo] = useState({ user: null, isLoading: true });
  useEffect(() => {
    auth.onAuthStateChanged(async (person) => {
      if (person) {
        const { displayName, email,uid } = person;
        let isuser = await isUser(uid);
        let isrestaurent = false;
        if(!isuser){
            isrestaurent = await isRestaurent(uid);
        }
        setInfo({
          user: { displayName, email,uid,isUser:isuser,isRestaurant:isrestaurent },
          isLoading: false,
        });
      } else {
        setInfo({
          user: null,
          isLoading: false,
        });
      }
    });
  }, []);
  return (
    <UserContext.Provider value={info}>{props.children}</UserContext.Provider>
  );
};

export default UserProvider;