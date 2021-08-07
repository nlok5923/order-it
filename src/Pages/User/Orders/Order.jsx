import React from "react"
import OrderCard from "../../../Components/Cards/OrderCard"
import { Container, Header } from "semantic-ui-react"

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