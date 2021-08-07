import React from "react"
import { Container, Header, Grid, Button } from "semantic-ui-react";
import Table from "../../../Components/Table/Table"

const marginTop = { marginTop:"5%" }

const containerHeight = { height: "100vh" }

const dishes = [
    {
        name: "yoyo",
        price: "500",
        desc: 'you will love it',
        discount: "10% off"
    },
    {
        name: "yoyo",
        price: "500",
        desc: 'you will love it',
        discount: "10% off"
    },
    {
        name: "yoyo",
        price: "500",
        desc: 'you will love it',
        discount: "10% off"
    },
    {
        name: "yoyo",
        price: "500",
        desc: 'you will love it',
        discount: "10% off"
    },
    {
        name: "yoyo",
        price: "500",
        desc: 'you will love it',
        discount: "10% off"
    },
    {
        name: "yoyo",
        price: "500",
        desc: 'you will love it',
        discount: "10% off"
    }
]

const UserCart = () => {
    return(
    <div>
           <div style={containerHeight}>
               <Container style={marginTop}>
          <Header as="h1" >All your Dishes are visible here 🤓 </Header>
          <Table info={dishes} />
          <Header as="h2">Total: 1234</Header>
          <Button floated="right" color="green">Procced to checkout</Button>
          </Container>
    </div>
    </div>
    )
}

export default UserCart;