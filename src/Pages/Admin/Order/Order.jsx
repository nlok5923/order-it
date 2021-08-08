import React from "react"
import "./Order.scss"
import { Container, Header, Segment } from "semantic-ui-react"
import OrderTable from "../../../Components/Table/AdminOrderTable"
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../Providers/UserProvider';
import { isUser, isRestaurent } from '../../../Services/Utils';
import { getAllOrders } from "../../../Services/Restaurent/RestaurantServices"
import { Redirect } from "react-router-dom"

const OrdersPage = () => {
    const info = useContext(UserContext);
    const { user, isLoading } = info;
    const [redirect, setredirect] = useState("")
    const [orders, setOrders] = useState([]);

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
            //fetching data
            let orders = await getAllOrders(user.uid);
            console.log(orders);
            setOrders(orders);
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
        <Container>
            <Header as="h2"> All your placed orders are here </Header>
            {orders.map(data => {
                return (
                    <div>
                    <Segment style={{ marginTop: "5%" }}>
                    <Header as="h2">
                        Summary 
                        <Header.Subheader>
                            Ordered on {data.date}
                        </Header.Subheader>
                      <Header.Subheader>
                          {data.address.address} | {data.address.city} | {data.address.pincode} | {data.address.country}
                      </Header.Subheader>
                    </Header>
                  </Segment>
                <OrderTable info = {data.orderInfo} />
                </div>
                )
            })}
        </Container>
    )
}

export default OrdersPage;