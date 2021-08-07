import React from "react"
import { Container, Header, Button, Form, Icon ,Message, Segment } from "semantic-ui-react";
import {  useState } from "react"
import Table from "../../../Components/Table/Table"

const formElement = [
    { name: "address", type: "text" },
    { name: "country", type: "text" },
    { name: "city", type: "text" },
    { name: "pincode", type: "number" },
  ]

  const dishes = [
    {
        name: "yoyo",
        price: "500",
        desc: 'you will love it',
        discount: "10% off",
        quantity:100
    },
    {
        name: "yoyo",
        price: "500",
        desc: 'you will love it',
        discount: "10% off",
        quantity:100
    },
    {
        name: "yoyo",
        price: "500",
        desc: 'you will love it',
        discount: "10% off",
        quantity:100
    },
    {
        name: "yoyo",
        price: "500",
        desc: 'you will love it',
        discount: "10% off",
        quantity:100
    },
    {
        name: "yoyo",
        price: "500",
        desc: 'you will love it',
        discount: "10% off",
        quantity:100
    },
    {
        name: "yoyo",
        price: "500",
        desc: 'you will love it',
        discount: "10% off",
        quantity:100
    }
]

const ShippingForm = () => {

    const [errMessage, setErrMessage] = useState("");
    const renderFormElements = () => {
        return formElement.map((ele, index) => (
          <Form.Field>
            <label className="label">
              {ele.name}
            </label>
            <input
              type={ele.type}
              name={ele.name}
              placeholder={ele.placeholder}
              required
            />
          </Form.Field>
        ));
      };
    
    return(
        <div>
               <Container>
      <div>
        <Segment>
          <Header as="h2" icon textAlign="center">
            <Icon name="address book outline" circular />
            <Header.Content>Enter shipping details </Header.Content>
          </Header>
          <Form error={!!errMessage}>
            {renderFormElements()}
            <Button primary type="submit" 
            >
              <Icon name="save" /> Proceed 
            </Button>
            <Message error header="Oops!!" content={errMessage} />
          </Form>
        </Segment>
      </div>
      <div>
          <Segment style={ { marginTop: "5%"}}>
              <Header as="h2">
                  Order Summary
              <Header.Subheader>
                  Order amount: 1000
              </Header.Subheader>
              <Header.Subheader>
                  Shipping Charge: 0 
              </Header.Subheader>
              </Header>

              <Header as="h2"> total Amount: 1000 </Header>
              <Button color="green"> Order now </Button>
          </Segment>
      </div>

      <div>
          <Segment style={ { marginTop: "5%"}}>
              <Header as="h3">Order details </Header>
              <Table info = {dishes} isOrder = {true} />
          </Segment>
      </div>
    </Container>
        </div>
    )
}

export default ShippingForm;