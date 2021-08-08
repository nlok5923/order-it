import { Container, Header, Button, Form, Icon, Message, Segment } from "semantic-ui-react";
import { useState, useEffect, useContext } from "react"
import Table from "../../../Components/Table/Table"
import SweetAlert from "sweetalert-react"
import 'sweetalert/dist/sweetalert.css';
import { useParams } from "react-router";
import { getUserCart, getCartItem,placeOrder } from "../../../Services/User/UserServices"
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

const ShippingForm = () => {
  const {restaurantId} = useParams();
  const info = useContext(UserContext);
  const { user, isLoading } = info;
  const [redirect, setRedirect] = useState(null);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [shippingDetail,setShippingDetail] = useState({
    address:"",
    country:"",
    city:"",
    pincode:""
  });
  const [loadingBtn,setLoadingBtn] = useState(false);
       
  const fetchData = async () => {
    setLoading(true);
    let cartitems = await getUserCart(user.uid);
    cartitems = cartitems.filter((item)=>item.restaurantId===restaurantId)
    let itemsData = [];
    for(let i=0;i<cartitems.length;i++){
      let itemInfo = await getCartItem(cartitems[i].restaurantId, cartitems[i].dishId);
      itemsData.push(
        { data: itemInfo,itemId:cartitems[i].itemId,restaurantId:cartitems[i].restaurantId,quantity: cartitems[i].quantity, dishId: cartitems[i].dishId }
      )
    }
    setItems(itemsData);
    setLoading(false);
  }

  const handleChange = (e)=>{
    setShippingDetail({
      ...shippingDetail,
      [e.target.name]:e.target.value
    })
  }

  useEffect(() => {
    if(!isLoading){
      if(user){
        fetchData();
      }else{
        setRedirect("/");
      }
    }
  }, [user,isLoading]);

  if (redirect) {
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
          onChange={handleChange}
          placeholder={ele.placeholder}
          required
        />
      </Form.Field>
    ));
  };

  const handleOrder = async()=>{
    if(shippingDetail.country.trim()==="" || shippingDetail.city.trim()===""|| shippingDetail.pincode.trim()==="" || shippingDetail.address.trim()===""){
      return;
    }
    setLoadingBtn(true);
    await placeOrder(user.uid,shippingDetail,items);
    setLoadingBtn(false);
    setShow(true);
  }

  return (
    <div>
      {loading && <Loader />}
      {!loading && (items.length > 0) &&
        <Container>
          <div>
            {show && <Segment>
              <SweetAlert
                show={show}
                type="success"
                title="Order Confirmed"
                text="Sit back and relax"
                onConfirm={() => setShow(false)}
              />
            </Segment>}
          </div>
          <div>
            <Segment style={{ marginTop: "5%" }}>
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
            </Segment>
          </div>

          <div>
            <Segment style={{ marginTop: "5%" }}>
              <Header as="h3">Order details </Header>
              <Table info={items} isOrder={true} />
            </Segment>
          </div>
          <Segment>
            <h2>Enter Your Shipping Details Here</h2>
            <Form error={!!errMessage}>
              {renderFormElements()}
                <Button color="green" type="submit" onClick={handleOrder}>{loadingBtn?"Ordering...":"Order now"}</Button>
              <Message error header="Oops!!" content={errMessage} />
            </Form>
          </Segment>
        </Container>}
    </div>
  )
}

export default ShippingForm;