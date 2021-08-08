import './dashboard.scss';
import { Button, Container } from 'semantic-ui-react';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../Providers/UserProvider';
import Loader from '../../../Components/Loader/index'
import { NavLink, Redirect } from "react-router-dom";
import { isUser, isRestaurent } from '../../../Services/Utils';
import DishCard from "../../../Components/Cards/DishCard"
import { getRestaurantDishes, deleteDish } from "../../../Services/Restaurent/RestaurantServices"

const Dashboard = () => {
    const info = useContext(UserContext);
    const { user, isLoading } = info;
    const [loading, setLoading] = useState(true);
    const [redirect, setredirect] = useState(null);
    const [restaurantDishes, setrestaurantDishes] = useState([]);

    const deleteParitcularDish = async (restId, dishId, fileName) => {
        await deleteDish(restId, dishId, fileName);
        handleUser();
    }

    const handleUser = async () => {
        let isuser = await isUser(user.uid)
        if (isuser) {
            setredirect("/");
            return;
        }
        let isrestaurant = await isRestaurent(user.uid);
        if (!isrestaurant) {
            setredirect("/restaurant/details");
        } else {
            getRestaurantDishes(user.uid).then(data => {
                setrestaurantDishes(data);
                setLoading(false);
            });
        }
    }

    useEffect(() => {
        if (!isLoading) {
            if (!user) {
                setredirect("/");
            } else {
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
                <Container>
                    <NavLink activeClassName="current" to="/restaurant/add-dish"> 
                    <Button className="add-item-btn" color="red" content='Add Dishes' icon='add' labelPosition='left' />
                    </NavLink>
                    {restaurantDishes.map((data, index) => <DishCard isRestaurant={true} info={data} uid={user.uid} deleteParitcularDish={deleteParitcularDish} />)}
                </Container>
            }
        </div>
    );
}

export default Dashboard;