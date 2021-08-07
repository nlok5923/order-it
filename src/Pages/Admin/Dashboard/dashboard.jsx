import './dashboard.scss';
import { Button } from 'semantic-ui-react';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../Providers/UserProvider';
import Loader from '../../../Components/Loader/index'
import { Redirect} from "react-router-dom";
import {isUser,isRestaurent} from '../../../Services/Utils'

const Dashboard = () => {
    const info = useContext(UserContext);
    const { user, isLoading } = info;
    const [loading, setLoading] = useState(true);
    const [redirect, setredirect] = useState(null);

    const handleUser = async () => {
        let isuser = await isUser(user.uid)
        if (isuser){
            setredirect("/");
            return;
        }
        let isrestaurant = await isRestaurent(user.uid);
        if (!isrestaurant) {
            setredirect("/restaurant/details");
        } else {
            
        }
        setLoading(false);
    }

    useEffect(() => {
        if (!isLoading) {
            if(!user){
                setredirect("/");
            }else{
                handleUser();
            }
        }
    }, [user, isLoading]);
    if (redirect) {
        return <Redirect to={redirect} />;
    }
    return (
        <div>
            {(isLoading || loading) && <Loader />}
            {!isLoading && !loading && 
                <div>
                    <Button className="add-item-btn" color="red" content='Add Dishes' icon='add' labelPosition='left' />
                </div>
            }
        </div>
    );
}

export default Dashboard;