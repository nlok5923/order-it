import { React, useState, useEffect, useContext } from "react"
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import "./Page.scss"
import { Container, Header, Segment, Divider, Button,Checkbox, Form } from "semantic-ui-react";
import DishCard from "../../Components/Cards/DishCard"
import { useParams } from "react-router";
import { getRestaurantDishes, getRestaurantInformation, getRestaurantImagesUrl } from "../../Services/Restaurent/RestaurantServices"
import Loader from '../../Components/Loader/index'
import { UserContext } from '../../Providers/UserProvider'
import { addDishToCart } from "../../Services/User/UserServices"
import toast, { Toaster } from "react-hot-toast";

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
  const [restaurantInfo, setRestaurantInfo] = useState([]);
  const [restaurantImages, setRestaurantImages] = useState([]);
  const { id } = useParams();
  const info = useContext(UserContext);
  const { user, isLoading } = info;
  
  const fetchData = async()=>{
    let data = await getRestaurantDishes(id) 
    setDishes(data);
    data = await getRestaurantInformation(id)
    setRestaurantInfo(data);
    let images = await getRestaurantImagesUrl(id);
    setRestaurantImages(images);
    setLoading(false);
  }

  const addDishes = async (Dishid, quantity) => {
    if(user && !isLoading) {
      let restId = id;
      let resp = await addDishToCart(user.uid, Dishid, quantity, restId);
      console.log(user.uid, Dishid, quantity, restId)
        if(resp)
        toast("Added in cart");
        else 
        toast("Already added in cart");
    } else {
      toast("please Login in first Sir");
    }
  };


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
            <h3> Filter your search </h3>
            <p> Rs 10 - Rs 100</p>
            <p> Rs 101 - Rs 250</p>
            <p> Rs 251 - Rs 500</p>
            <p> Rs 501 - Rs 1000</p>
            <Form>
              <Form.Field>
                <input type="text" name="from" placeholder="from" />
              </Form.Field>
            </Form>
            <Form>
              <Form.Field>
              <input type="text" name="to" placeholder="to" style={{ marginTop: "5%" }} />
              </Form.Field>
            </Form>
            <Button className="filter-btn" style={{ marginTop: "5%" }} basic color="green" content="filter" />
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
            {dishes.map((data, index) => <DishCard info={data} addDishes={addDishes} />)}
          </Segment>
        </Container>
      }
    </>
  )
}

export default Page;