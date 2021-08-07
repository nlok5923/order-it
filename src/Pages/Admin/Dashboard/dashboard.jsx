import './dashboard.scss';
import { Button, Container } from 'semantic-ui-react';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../Providers/UserProvider';
import Loader from '../../../Components/Loader/index'
import { Redirect } from "react-router-dom";
import { isUser, isRestaurent } from '../../../Services/Utils';
import DishCard from "../../../Components/Cards/DishCard"
import { getRestaurantDishes } from "../../../Services/Restaurent/RestaurantServices"

const dishes = [
    {
        name: "yoyo",
        price: "500",
        desc: 'you will love it',
        discount: "10% off",
        date: "04/04/2020",
        status: "in transit",
        details: ""
    },
    {
        name: "yoyo",
        price: "500",
        desc: 'you will love it',
        discount: "10% off",
        date: "04/04/2020",
        status: "in transit",
        details: "",
    },
    {
        name: "yoyo",
        price: "500",
        desc: 'you will love it',
        discount: "10% off",
        date: "04/04/2020",
        status: "dispatched",
        details: ""
    },
    {
        name: "yoyo",
        price: "500",
        desc: 'you will love it',
        discount: "10% off",
        date: "04/04/2020",
        status: "dispatched",
        details: ""
    },
    {
        name: "yoyo",
        price: "500",
        desc: 'you will love it',
        discount: "10% off",
        date: "04/04/2020",
        status: "dispatched",
        details: ""
    },
    {
        name: "yoyo",
        price: "500",
        desc: 'you will love it',
        discount: "10% off",
        date: "04/04/2020",
        status: "dispatched",
        details: ""
    }
]

const Dashboard = () => {
    const info = useContext(UserContext);
    const { user, isLoading } = info;
    const [loading, setLoading] = useState(true);
    const [redirect, setredirect] = useState(null);
    const [restaurantDishes, setrestaurantDishes] = useState([]);

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
                console.log(data); 
                setrestaurantDishes(data);
                setLoading(false);
            });

            console.log(restaurantDishes)
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
            <Container>
                <Button className="add-item-btn" color="red" content='Add Dishes' icon='add' labelPosition='left' />
                {/* {dishes.map((data, index) => <DishCard info = {data} isRestaurant={true} />)} */}
                {restaurantDishes.map((data, index) => <DishCard info={data} />)}
            </Container>
        </div>
    );
}

export default Dashboard;