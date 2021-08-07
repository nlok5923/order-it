import React from "react"
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import "./Page.scss"
import { Container, Header, Segment, Divider, Button } from "semantic-ui-react";
import DishCard from "../../Components/Cards/DishCard"

const properties = {
  duration: 3000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: false,
  pauseOnHover: true,
};

const dishes = [
  {
      name: "yoyo",
      price: "500",
      desc: 'you will love it',
      discount: "10% off",
      date: "04/04/2020",
      status: "in transit",
      details: ""
  },
  {
      name: "yoyo",
      price: "500",
      desc: 'you will love it',
      discount: "10% off",
      date: "04/04/2020",
      status: "in transit",
      details: "",
  },
  {
      name: "yoyo",
      price: "500",
      desc: 'you will love it',
      discount: "10% off",
      date: "04/04/2020",
      status: "dispatched",
      details: ""
  },
  {
      name: "yoyo",
      price: "500",
      desc: 'you will love it',
      discount: "10% off",
      date: "04/04/2020",
      status: "dispatched",
      details: ""
  },
  {
      name: "yoyo",
      price: "500",
      desc: 'you will love it',
      discount: "10% off",
      date: "04/04/2020",
      status: "dispatched",
      details: ""
  },
  {
      name: "yoyo",
      price: "500",
      desc: 'you will love it',
      discount: "10% off",
      date: "04/04/2020",
      status: "dispatched",
      details: ""
  }
]


const images = ["images/pizza.jpg","images/pizza.jpg","images/pizza.jpg","images/pizza.jpg","images/pizza.jpg"]

const Page = () => {
  return (
    <>
        <Container>
    <Segment>
      <div className="slide-container">
        <Slide {...properties}>
          {images.map((data, index)=>{
            return(
             <div className="each-slide">
             <img src={data} alt="food" className="food-slide-image" />
         </div>)
          })}
        </Slide>
      </div>

          <Header as="h1">
            Restaurant Name
            <Header.Subheader>
           City | Country | 6:00 pm - 7:00 pm
            </Header.Subheader>
            </Header>
            <Divider />
          <Header as="h2">Recommended</Header>
          {dishes.map((data, index) => <DishCard info = {data}/>)}
        </Segment>
      </Container>

    </>
  )
}

export default Page;