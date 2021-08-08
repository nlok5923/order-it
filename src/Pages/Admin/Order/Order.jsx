import React from "react"
import "./Order.scss"
import { Container, Header, Segment, Dropdown } from "semantic-ui-react"
import OrderTable from "../../../Components/Table/AdminOrderTable"
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../Providers/UserProvider';
import { isUser, isRestaurent } from '../../../Services/Utils';
import { getAllOrders } from "../../../Services/Restaurent/RestaurantServices"
import { Redirect } from "react-router-dom"
import { updateUserOrderStatus } from "../../../Services/Restaurent/RestaurantServices"
import toast, { Toaster } from "react-hot-toast";

const OrdersPage = () => {
    const info = useContext(UserContext);
    const { user, isLoading } = info;
    const [redirect, setredirect] = useState("")
    const [orders, setOrders] = useState([]);
    const [orderstatus, setorderstatus] = useState("");

    const statusOptions = [
        {key:1 , text: "dispatced", value: "dispatched"},
        {key:2 , text: "processing", value: "processing"},
        {key:3 , text: "delivered", value: "delivered"},
    ]

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
            let orders = await getAllOrders(user.uid);
            console.log(orders);
            setOrders(orders);
        }
    }

    const updateStatus = async (status, orderid, userid) => {
        let restId = user.uid;
        await updateUserOrderStatus(userid, orderid, status, restId);
        toast.success("status updated");
    }

    const handleStatus = (e, info, orderid, userid) => {
        setorderstatus(info.value);
        updateStatus(info.value, orderid, userid);
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
            <Toaster />
            <Header as="h2"> All your placed orders are here </Header>
            {orders.map(data => {
                return (
                    <div style={{ marginTop: "5%" }}>
                    <Dropdown 
                      clearable
                      options = {statusOptions}
                      placeholder={data.status}
                      selection
                      onChange ={(e, info) => handleStatus(e, info, data.id, data.userid)}
                    //   onChange={(e, dat) => updateStatus( dat.name, data.id, data.userid)}
                      />
                    <Segment >
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
                <OrderTable info = {data.orderInfo} updateStatus={updateStatus} status={data.status} />
                </div>
                )
            })}
        </Container>
    )
}

export default OrdersPage;