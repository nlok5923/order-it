import React from "react";
import "./PaymentMethod.scss";
import { Container, Segment, Header, Button } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const PaymentMethod = () => {
  return (
    <div className="payment-container">
      <Container>
        <Header as="h2">Select payment method </Header>
        <Segment>
          <input type="radio" id="cod" name="cod" />
          <label for="html">cash on delivery</label>
          <br />
          <br />
          <input type="radio" id="kidney" name="kidney" />
          <label for="kidney">Kidney</label>
          <br />
          <br />
          <input type="radio" id="card" name="card" />
          <label for="card">Card</label>
        </Segment>
        <NavLink activeClassName="current" to="/user/cart/shipping">
          <Button color="green" content="next" basic floated="right" />
        </NavLink>
        <NavLink activeClassName="current" to="/user/cart">
          <Button color="red" content="back" basic floated="left" />
        </NavLink>
      </Container>
    </div>
  );
};

export default PaymentMethod;
