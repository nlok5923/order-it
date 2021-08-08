import React from "react"
import "./Order.scss"
import { Container, Header } from "semantic-ui-react"
import OrderTable from "../../../Components/Table/AdminOrderTable"

const orders = [
    {
        dishName: "pazzta",
        price: "10",
        discount: "10",
        discountedPrice: "345",
        quantity: "100"
    },
    {
        dishName: "pazzta",
        price: "10",
        discount: "10",
        discountedPrice: "345",
        quantity: "100"
    },
    {
        dishName: "pazzta",
        price: "10",
        discount: "10",
        discountedPrice: "345",
        quantity: "100"
    },
    {
        dishName: "pazzta",
        price: "10",
        discount: "10",
        discountedPrice: "345",
        quantity: "100"
    }
]

const OrdersPage = () => {
    return (
        <Container>
            <Header as="h2"> All your orders are here </Header>
            <OrderTable info = {orders} />
        </Container>
    )
}

export default OrdersPage;