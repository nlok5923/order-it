import React from "react"
import { Card, Header, Icon, Button, Label } from "semantic-ui-react"

const OrderCard = (props) => {
    return(
        <Card fluid>
        {props.orders.status === "dispatched" ? <Label color={"green"} key={"orange"}>
            {props.orders.status}
        </Label> : <Label color={"red"} key={"orange"}>
            {props.orders.status}
        </Label> }
       
        <Card.Content
        header={
          <Header as="h2">
            <Icon name="money" />
            <Header.Content>
              <Header.Subheader> Order </Header.Subheader>
            </Header.Content>
          </Header>
        }
      />
      <Card.Content>
        <p>Name: {props.orders.name}</p>
        <p>date: {props.orders.date}</p>
        <p>Amount: {props.orders.price}</p>
        <p>Description: {props.orders.desc}</p>
        </Card.Content>
        </Card>
    )
}

export default OrderCard;