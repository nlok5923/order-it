import { React, useState, useEffect, useContext } from "react"
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import "./Page.scss"
import { Container, Header, Segment, Divider, Button, Checkbox, Form } from "semantic-ui-react";
import DishCard from "../../Components/Cards/DishCard"
import { useParams } from "react-router";
import { getRestaurantDishes, getRestaurantInformation, getRestaurantImagesUrl } from "../../Services/Restaurent/RestaurantServices"
import Loader from '../../Components/Loader/index'
import { UserContext } from '../../Providers/UserProvider'
import { addDishToCart } from "../../Services/User/UserServices"
import toast, { Toaster } from "react-hot-toast";
import CartLoader from "react-loader-spinner"

const properties = {
  duration: 3000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: false,
  pauseOnHover: true,
};

const Page = () => {

  const [loading, setLoading] = useState(true);
  const [dishes, setDishes] = useState([]);
  const [allDish,setAllDish] = useState([]);
  const [restaurantInfo, setRestaurantInfo] = useState([]);
  const [restaurantImages, setRestaurantImages] = useState([]);
  const { id } = useParams();
  const info = useContext(UserContext);
  const { user, isLoading } = info;
  const [adding, setAdding] = useState(false);
  
  const fetchData = async()=>{
    let data = await getRestaurantDishes(id) 
    setDishes(data);
    setAllDish(data);
    data = await getRestaurantInformation(id)
    setRestaurantInfo(data);
    let images = await getRestaurantImagesUrl(id);
    setRestaurantImages(images);
    setLoading(false);
  }

  const addDishes = async (Dishid, quantity) => {
    if(user && !isLoading) {
      let restId = id;
      setAdding(true);
      let resp = await addDishToCart(user.uid, Dishid, quantity, restId);
        if(resp)
        toast("Added in cart");
        else 
        toast("Already added in cart");
      setAdding(false);
    } else {
      toast("please Login in first Sir");
    }
  };
  const minv = (a,b)=>{
    return a>b?b:a;
  }
  const handleFilter = ()=>{
    let v1 = document.getElementById("from").value;
    let v2 = document.getElementById("to").value;
    if(!v1 || v1<0){ v1 = 0;}
    if(!v2 || v2<0){v2 = 10000;}
    let tem = minv(v1,v2);
    v2 = parseInt(v1) + parseInt(v2) - parseInt(tem);
    v1 = parseInt(tem);
    let temDish = allDish.filter((dish)=>((parseInt(dish.discountedPrice) >= v1) && (parseInt(dish.discountedPrice) <=v2)));
    setDishes(temDish);
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <>
      {loading && <Loader />}
      {!loading &&
        <Container>
          <Toaster />
          <div className="filter">
            {adding ? 
            <CartLoader 
             type="Puff"
             color="red"
             height={50}
             width={50}
            />: null }
            </div>
          <Segment>
            <div className="slide-container">
              <Slide {...properties}>
                {restaurantImages.map((data, index) => {
                  return (
                    <div className="each-slide">
                      <img src={data} alt="food" className="food-slider-image" />
                    </div>)
                })}
              </Slide>
            </div>

            <Header as="h1">
              {restaurantInfo.RestaurantName}
              <Header.Subheader>
                {restaurantInfo.country} | {restaurantInfo.city} | {restaurantInfo.address}
              </Header.Subheader>
            </Header>
            <Divider />
            <Header as="h2">Recommended</Header>
            <Form>
              <Form.Field>
                 <input id="from" type="number" placeholder="from" />
              </Form.Field>
              <Form.Field>
                 <input id="to" type="number" placeholder="to" />
              </Form.Field>
              <Button onClick={handleFilter} floated="right" content="Filter" basic />
            </Form>
            {dishes.map((data, index) => <DishCard info={data} addDishes={addDishes} />)}
          </Segment>
        </Container>
      }
    </>
  )
}

export default Page;