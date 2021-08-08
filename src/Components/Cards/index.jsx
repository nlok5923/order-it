import React from "react";
import { Card, Icon, Image, Label, Button } from "semantic-ui-react";
import { useState, useEffect } from "react";
import { getRestaurantImagesUrl } from "../../Services/Restaurent/RestaurantServices";

const CardExampleCard = (props) => {
  const [images, setImages] = useState([]);
  const fetchImages = async () => {
    let images = await getRestaurantImagesUrl(props.info.restaurantId);
    setImages(images);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <Card>
      {props.info.discount ? (
        <Label color="red" floating>
          {props.info.discount}
        </Label>
      ) : null}
      {images.length > 0 ? (
        <img src={images[0]} wrapped ui={false} style={{  height: "300px", width:"260px" }} alt="card" />
      ) : (
        <img src={"/images/pizza.jpg"} wrapped ui={false} style={{  height: "300px", width:"260px" }} alt="card" />
      )}
      <Card.Content>
        <Card.Header>{props.info.RestaurantName}</Card.Header>
        <Card.Description>
          <span>{props.info.address}</span>
        </Card.Description>
      </Card.Content>
      <Card.Content>
        {props.isCart ? (
          <div>
            <Button icon="trash" color="red" floated="right" />
            <Button icon="buy" color="green" floated="right" />
          </div>
        ) : null}
      </Card.Content>
    </Card>
  );
};

export default CardExampleCard;
