import Card from "../Components/Cards/index"
import { Container, Grid, Header } from 'semantic-ui-react'
import { getRestaurants } from "../Services/Restaurent/RestaurantServices"
import { useEffect, useState } from "react"

const marginTop = { marginTop:"5%" }

const dishes = [
    {
        name: "yoyo",
        price: "500",
        desc: 'you will love it',
        discount: "10% off",
        address: "IIIT Vadodara"
    },
    {
        name: "yoyo",
        price: "500",
        desc: 'you will love it',
        discount: "10% off",
        address: "IIIT Vadodara"
    },
    {
        name: "yoyo",
        price: "500",
        desc: 'you will love it',
        discount: "10% off",
        address: "IIIT Vadodara"
    },
    {
        name: "yoyo",
        price: "500",
        desc: 'you will love it',
        discount: "10% off",
        address: "IIIT Vadodara"
    },
    {
        name: "yoyo",
        price: "500",
        desc: 'you will love it',
        discount: "10% off",
        address: "IIIT Vadodara"
    },
    {
        name: "yoyo",
        price: "500",
        desc: 'you will love it',
        discount: "10% off",
        address: "IIIT Vadodara"
    }
]
const Home = () => {

    const [restaurant, setRestaurants] = useState([]);
    useEffect(() => {
        getRestaurants()
        .then(data => setRestaurants(data));
    },[])
    return(
        <div>
            <Container >
                <Header as="h1">Search best foods </Header>
            <Grid stackable columns={4}>
              {restaurant
                  .map((data) => {
                    return (
                      <Grid.Column>
                        <Container fluid textAlign="center">
                            <Card info={data} />
                        </Container>
                      </Grid.Column>
                    );
                  })}
            </Grid>
            </Container>
        </div>
    );
}

export default Home;
