import React from "react"
import { Container, Header, Button, Form, Icon ,Message, Segment } from "semantic-ui-react";
import {  useState, useEffect, useContext } from "react"
import Table from "../../../Components/Table/Table"
import SweetAlert from "sweetalert-react"
import 'sweetalert/dist/sweetalert.css';
import { getUserCart, getCartItem } from "../../../Services/User/UserServices"
import { UserContext } from '../../../Providers/UserProvider'
import { Redirect } from "react-router";
import Loader from "../../../Components/Loader/index"
import { NavLink } from "react-router-dom";
import { getAmountSum } from "../../../Services/Utils"

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

  const info = useContext(UserContext);
  const { user, isLoading } = info;
  const [cartItems, setCartItems] = useState([]);
  const [redirect, setRedirect] = useState(null);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    let cartitems = await getUserCart(user.uid);
    setCartItems(cartitems);
    console.log(cartitems)
    let itemsData = [];
    cartitems.map(async item => {
      let itemInfo = await getCartItem(item.restaurantId, item.dishId);
      setItems(prevState => [...prevState, { data: itemInfo, quantity: item.quantity }]);
    });
    setItems(itemsData);
    setLoading(false);
  }

  useEffect(() => {
   if(user && !isLoading) {
     fetchData();
   } else {
     setRedirect("/");
   }
  },[]);

  if(redirect) {
    <Redirect to={redirect} />
  }


  const [show, setShow] = useState(false)
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
      {loading && <Loader />}
      {!loading &&  (items.length > 0) &&
      <Container>
      <div>
        <Segment>
        <SweetAlert
        show={show}
        type="success"
        title="Order Confirmed"
        text="Sit back and relax"
        onConfirm={() => setShow(false)}
      />

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
                  Order amount: Rs {getAmountSum(items)}
              </Header.Subheader>
              <Header.Subheader>
                  Shipping Charge: 0 
              </Header.Subheader>
              </Header>

              <Header as="h2"> total Amount: Rs {getAmountSum(items)}</Header>
              <Button color="green" onClick={() => setShow(true)}> Order now </Button>
          </Segment>
      </div>

      <div>
          <Segment style={ { marginTop: "5%"}}>
              <Header as="h3">Order details </Header>
              <Table info = {items} isOrder = {true} />
          </Segment>
      </div>
    </Container>}
        </div>
    )
}

export default ShippingForm;