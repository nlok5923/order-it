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
    cartitems.sort((a, b) => a.restaurantId - b.restaurantId)
    let itemsData = [];
    for (let i = 0; i < cartitems.length; i++) {
      let curRestaurant = cartitems[i].restaurantId;
      let itemFromOneRestaurant = [];
      let itemInfo = await getCartItem(cartitems[i].restaurantId, cartitems[i].dishId);
      itemFromOneRestaurant.push(
        { data: itemInfo, itemId: cartitems[i].itemId,restaurantId:cartitems[i].restaurantId, quantity: cartitems[i].quantity, dishId: cartitems[i].dishId }
      )
      while (i + 1 < items.length && items[i + 1].sellerId === curRestaurant) {
        i++;
        itemInfo = await getCartItem(cartitems[i].restaurantId, cartitems[i].dishId);
        itemFromOneRestaurant.push(
          { data: itemInfo, itemId: cartitems[i].itemId,restaurantId:cartitems[i].restaurantId, quantity: cartitems[i].quantity, dishId: cartitems[i].dishId }
        )
      }
      itemsData.push(itemFromOneRestaurant);
    }
    setItems(itemsData);
    setLoading(false);
  }

  const handleDelete = async (userid, id) => {
    setItems(items.filter((item) => item.itemId !== id))
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
      {!loading && <div>
        <Container style={marginTop}>
        <Header as="h1">All your added items are here 🤓 </Header>
        {
          items.map((item, index) => {
            return (
              <div key={index}>
                  <Table info={item} userid={user.uid} handleDelete={handleDelete} />
                  <Header as="h2">Total: Rs{getAmountSum(item)}</Header>
                  <NavLink activeClassName="current" to={"/user/cart/shipping/" + item[0].restaurantId} >
                    <Button floated="right" color="green">
                      Procced to checkout
                    </Button>
                  </NavLink>
              </div>
            );
          })
        }
                </Container>
      </div>}
    </>
  );
};

export default UserCart;
