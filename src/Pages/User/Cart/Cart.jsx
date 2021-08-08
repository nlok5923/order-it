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
    let itemsData = [];
    for(let i=0;i<cartitems.length;i++){
      let itemInfo = await getCartItem(cartitems[i].restaurantId, cartitems[i].dishId);
      itemsData.push(
        { data: itemInfo,itemId:cartitems[i].itemId, quantity: cartitems[i].quantity, dishId: cartitems[i].dishId }
      )
    }
    setItems(itemsData);
    setLoading(false);
  }

  const handleDelete = async(userid, id)=>{
    setItems(items.filter((item)=>item.itemId!==id))
    await deleteCartItem(userid, id);
  }

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        fetchData();
      } else {
        setRedirect("/");
      }
    }
  }, [user, isLoading]);

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  return (
    <>
      {loading && (items.length === 0) && <Loader />}
      {!loading && (items.length > 0) && <div>
        <div style={containerHeight}>
          <Container style={marginTop}>
            <Header as="h1">All your Dishes are visible here 🤓 </Header>
            <Table info={items} userid={user.uid} handleDelete={handleDelete}/>
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
