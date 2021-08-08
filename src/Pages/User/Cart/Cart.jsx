import { React, useState, useEffect, useContext } from "react";
import { Container, Header, Grid, Button } from "semantic-ui-react";
import Table from "../../../Components/Table/Table";
import { getUserCart, getCartItem } from "../../../Services/User/UserServices"
import { UserContext } from '../../../Providers/UserProvider'
import { Redirect } from "react-router";
import Loader from "../../../Components/Loader/index"
import { NavLink } from "react-router-dom";
const marginTop = { marginTop: "5%" };

const containerHeight = { height: "100vh" };

const dishes = [
  {
    name: "yoyo",
    price: "500",
    desc: "you will love it",
    discount: "10% off",
  },
  {
    name: "yoyo",
    price: "500",
    desc: "you will love it",
    discount: "10% off",
  },
  {
    name: "yoyo",
    price: "500",
    desc: "you will love it",
    discount: "10% off",
  },
  {
    name: "yoyo",
    price: "500",
    desc: "you will love it",
    discount: "10% off",
  },
  {
    name: "yoyo",
    price: "500",
    desc: "you will love it",
    discount: "10% off",
  },
  {
    name: "yoyo",
    price: "500",
    desc: "you will love it",
    discount: "10% off",
  },
];

const UserCart = () => {
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
     console.log("dfdfdfdfd");
     fetchData();
   } else {
     setRedirect("/");
   }
  },[]);

  if (redirect) {
    return <Redirect to={redirect} />;
}

  return (
    <>
    {loading && (items.length === 0) && <Loader />}
    {!loading &&  (items.length > 0) && <div>
      <div style={containerHeight}>
        <Container style={marginTop}>
          <Header as="h1">All your Dishes are visible here 🤓 </Header>
          <Table info={items} />
          <Header as="h2">Total: 1234</Header>
          <NavLink activeClassName="current" to="/user/cart/payment" >
          <Button floated="right" color="green">
            Procced to checkout
          </Button>
          </NavLink>
        </Container>
      </div>
    </div>}
    </>
  );
};

export default UserCart;
