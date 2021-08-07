import React from "react"
import OrderCard from "../../../Components/Cards/OrderCard"
import { Container, Header } from "semantic-ui-react"
import { useEffect, useContext, useState } from 'react';
import { UserContext } from '../../../Providers/UserProvider'
import { Redirect } from "react-router-dom";
import Loader from "../../../Components/Loader/index"

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

const OrderPage = () => {
    
    const info = useContext(UserContext);
    const { user, isLoading } = info;
    const [redirect, setredirect] = useState(null);
    
    // useEffect(() => {
    //   if (user && !isLoading) {
    //       setredirect("/user/login");
    //   }
    // }, [user, isLoading]);
  
    // if (redirect) {
    //   return <Redirect to={redirect} />;
    // }

    return(
        <div>
        <Container>
            <Header as="h2"> All of your orders are here </Header>
            {dishes.map((data, index) => <OrderCard orders={data} />)}
        </Container>

        </div>
    )
}

export default OrderPage;