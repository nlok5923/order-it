import { React, useState } from "react";
import "./Card.scss";
import { useHistory } from "react-router-dom";
import { Card, Header, Icon, Button, Label, Form } from "semantic-ui-react";

const OrderCard = (props) => {
  const history = useHistory();
  const [quantity, setItemQuantity] = useState(1);

  const setQuantity = (e) => {
    setItemQuantity(e.target.value);
  }

  return (
    <Card fluid>
      {props.info.discount ? 
       <Label color="red" floating >
          {props.info.discount} %
        </Label> : null} 
      <Card.Content>
        <div className="dish-info">
          <div className="dish-info-text">
            <Header as="h2">{props.info.dishName}</Header>
            <Header as="h2">
              <Header.Subheader>
                Amount: <strike> Rs {props.info.price} </strike>  <b> Rs {props.info.discountedPrice}</b>
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
              <div>
              <Button
                icon="add"
                basic
                className="add-to-cart-btn"
                floated="left"
                content="Add to cart"
                onClick={() => props.addDishes(props.info.dishId, quantity)}
                color="red"
              />
              <br />
              <Form>
                <Form.Field>
                  <input type="number" placeholder="enter item quantity" name="quantity" style={{ width: "15vw", marginTop:"5%" }} onChange={(e) => setQuantity(e)} />
                </Form.Field>
              </Form>
                </div>
            )}
          </div>
          <div className="dish-info-img">
            <img
              src={props.info.firebaseImage}
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
