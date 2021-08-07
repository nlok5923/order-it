import './dashboard.scss';
import { Button } from 'semantic-ui-react';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../Providers/UserProvider';
import Loader from '../../../Components/Loader/index'
import { Redirect } from "react-router-dom";

const Dashboard = () => {
    const info = useContext(UserContext);
    const { user, isLoading } = info;
    const [loading, setLoading] = useState(true);
    const [redirect, setredirect] = useState(null);

    const handleUser = async () => {
        if (user.isUser){
            setredirect("/");
            return;
        }
        if (!user.isRestaurant) {
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
            <Button className="add-item-btn" color="red" content='Add Dishes' icon='add' labelPosition='left' />
        </div>
    );
}

export default Dashboard;