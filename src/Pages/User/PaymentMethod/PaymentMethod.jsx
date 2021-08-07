import React from "react";
import "./PaymentMethod.scss";
import { Container, Segment, Header } from "semantic-ui-react";

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
      </Container>
    </div>
  );
};

export default PaymentMethod;
