import { React, useState, useEffect } from "react"
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import "./Page.scss"
import { Container, Header, Segment, Divider, Button } from "semantic-ui-react";
import DishCard from "../Cards/DishCard"
import { useParams } from "react-router";
import { getRestaurantDishes, getRestaurantInformation, getRestaurantImagesUrl } from "../../Services/Restaurent/RestaurantServices"
import Loader from '../Loader/index'

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
  
  const fetchData = async()=>{
    let data = await getRestaurantDishes(id) 
    setDishes(data);
    data = await getRestaurantInformation(id)
    setRestaurantInfo(data);
    let images = await getRestaurantImagesUrl(id);
    setRestaurantImages(images);
    setLoading(false);
  }

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
            {dishes.map((data, index) => <DishCard info={data} />)}
          </Segment>
        </Container>
      }
    </>
  )
}

export default Page;