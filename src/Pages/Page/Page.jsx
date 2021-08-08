import { React, useState, useEffect, useContext } from "react"
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import "./Page.scss"
import { Container, Header, Segment, Divider, Button } from "semantic-ui-react";
import DishCard from "../../Components/Cards/DishCard"
import { useParams } from "react-router";
import { getRestaurantDishes, getRestaurantInformation, getRestaurantImagesUrl } from "../../Services/Restaurent/RestaurantServices"
import Loader from '../../Components/Loader/index'
import { UserContext } from '../../Providers/UserProvider'
import { addDishToCart } from "../../Services/User/UserServices"
import toast from "react-hot-toast";

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

  const addDishes = async (id) => {
    if(user && !isLoading) {
      let resp = await addDishToCart(user.uid, id)
      // if (state) {
        console.log(user.uid, id);
        if(resp)
        toast("Added in favourite");
        else 
        toast("Already added in favourite");
      // }
    } else {
      toast("please Login in first");
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
            {dishes.map((data, index) => <DishCard info={data} addDish={addDishes} />)}
          </Segment>
        </Container>
      }
    </>
  )
}

export default Page;