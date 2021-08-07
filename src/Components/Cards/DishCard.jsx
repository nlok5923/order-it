import React from "react";
import "./Card.scss";
import { Card, Header, Icon, Button, Label } from "semantic-ui-react";

// name: "yoyo",
// price: "500",
// desc: 'you will love it',
// discount: "10% off",
// date: "04/04/2020",
// status: "dispatched",
// details: ""
const OrderCard = (props) => {
  return (
    <Card fluid>
      <Card.Content>
        <div className="dish-info">
          <div className="dish-info-text">
              <Header as="h2">
            {props.info.name}
              </Header>
            <Header as ="h2"> 
            <Header.Subheader>
                Amount: {props.info.price}
            </Header.Subheader>
            <Header.Subheader>
                Description: {props.info.desc}
            </Header.Subheader>
            </Header>
            <Button
              icon="add"
              basic
              floated="left"
              content="Add to cart"
              color="red"
            />
          </div>
          <div className="dish-info-img">
            <img
              src="/images/pizza.jpg"
              style={{ float: "right" }}
              alt="pizza"
              className="dish-image"
            />
          </div>
        </div>
      </Card.Content>
    </Card>
  );
};

export default OrderCard;
