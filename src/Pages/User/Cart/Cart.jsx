import { React, useState, useEffect, useContext } from "react";
import { Container, Header, Grid, Button } from "semantic-ui-react";
import Table from "../../../Components/Table/Table";
import { getUserCart, getCartItem } from "../../../Services/User/UserServices"
import { UserContext } from '../../../Providers/UserProvider'
import { Redirect } from "react-router";
import Loader from "../../../Components/Loader/index"
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
    console.log("ths is cart",cartitems)
    let itemsData = [];
    cartItems.map(async item => {
      let itemInfo = await getCartItem(item.restaurantId, item.dishId);
      console.log("areitem", itemInfo);
      itemsData.push({ data:itemInfo, quantity: item.quantity });
      console.log(itemsData)
    });
    setItems(itemsData);
    console.log("ye item hai", items)
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
    {loading && <Loader />}
    {!loading &&  <div>
      <div style={containerHeight}>
        <Container style={marginTop}>
          <Header as="h1">All your Dishes are visible here 🤓 </Header>
          <Table info={items} />
          {items.length}
          <Header as="h2">Total: 1234</Header>
          <Button floated="right" color="green">
            Procced to checkout
          </Button>
        </Container>
      </div>
    </div>}
    </>
  );
};

export default UserCart;
