import { React, useState, useEffect, useContext } from "react";
import { Container, Header, Grid, Button } from "semantic-ui-react";
import Table from "../../../Components/Table/Table";
import { getUserCart, getCartItem, deleteCartItem } from "../../../Services/User/UserServices"
import { UserContext } from '../../../Providers/UserProvider'
import { Redirect } from "react-router";
import Loader from "../../../Components/Loader/index"
import { NavLink } from "react-router-dom";
import { getAmountSum } from "../../../Services/Utils"
const marginTop = { marginTop: "5%" };

const containerHeight = { height: "100vh" };

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
      setItems(prevState => [...prevState, { data: itemInfo, quantity: item.quantity, dishId: item.dishId }]);
    });
    setItems(itemsData);
    setLoading(false);
  }

  const refreshData = () => {
    fetchData();
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
          <Table info={items} userid = {user.uid} refreshData={refreshData} />
          <Header as="h2">Total: Rs{getAmountSum(items)}</Header>
          <NavLink activeClassName="current" to="/user/cart/shipping" >
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
