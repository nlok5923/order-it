import { useState,useEffect,useContext } from "react";
import {isUser,isRestaurent} from '../../../Services/Utils'
import NavbarLoggedOut from "../NavGeneral/NavGeneral";
import NavbarAdminLogged from "../NavAdminLogged/NavAdminLogged";
import NavbarUserLogged from "../NavUserLogged/NavUserLogged";
import Loader from '../../Loader/index';
import { UserContext } from "../../../Providers/UserProvider";

const Navbar = ()=>{
    const [loading,setLoading] = useState(true);
    const [loggedOut,setLoggedOut] = useState(false);
    const [userLogged,setUserLogged] = useState(false);
    const [restaurantLogged,setRestaurantLogged] = useState(false);
    const info = useContext(UserContext);
    const { user, isLoading } = info;

    const fetchData = async()=>{
        if(!user){
            setUserLogged(false);
            setRestaurantLogged(false);
            setLoggedOut(true);
        }else{
            let isuser = await isUser(user.uid);
            if(isuser){
                setRestaurantLogged(false);
                setLoggedOut(false);
                setUserLogged(true);
            }else{
                let isrestaurant = await isRestaurent(user.uid);
                if(isrestaurant){
                    setUserLogged(false);
                    setLoggedOut(false);
                    setRestaurantLogged(true);
                }else{
                    setUserLogged(false);
                    setRestaurantLogged(false);
                    setLoggedOut(true);
                }
            }
        }
        setLoading(false);
    }

    useEffect(()=>{
        if(!isLoading){
            fetchData();
        }
    },[user,isLoading])

    return (
        <div>
            {(isLoading || loading) && <Loader />}
            {!isLoading && !loading && loggedOut && <NavbarLoggedOut />}
            {!isLoading && !loading && userLogged && <NavbarUserLogged />}
            {!isLoading && !loading && restaurantLogged && <NavbarAdminLogged />}
        </div>
    );
}

export default Navbar;