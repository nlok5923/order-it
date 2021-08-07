import React from "react";
import "./Card.scss";
import { useHistory } from "react-router-dom";
import { Card, Header, Icon, Button, Label } from "semantic-ui-react";

const OrderCard = (props) => {
  const history = useHistory();

  return (
    <Card fluid>
      <Card.Content>
        <div className="dish-info">
          <div className="dish-info-text">
            <Header as="h2">{props.info.dishName}</Header>
            <Header as="h2">
              <Header.Subheader>
                Amount: {props.info.price} with {props.info.discount}% discount
              </Header.Subheader>
              <Header.Subheader>
                Description: {props.info.description} 
              </Header.Subheader>
            </Header>
            {props.isRestaurant ? (
              <div>
                <Button
                  icon="edit"
                  onClick={() => {
                    history.push({
                      pathname: "/restaurant/edit-dish",
                      data: props.info,
                    });
                  }}
                  basic
                  floated="left"
                  color="green"
                />
                <Button
                  icon="trash"
                  basic
                  onClick={() =>
                    props.deleteParitcularDish(props.uid, props.info.dishId, props.info.fileName)
                  }
                  floated="left"
                  color="red"
                />
              </div>
            ) : (
              <Button
                icon="add"
                basic
                floated="left"
                content="Add to cart"
                color="red"
              />
            )}
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
