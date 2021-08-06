import { signOut } from '../Services/Utils'
import Card from "../Components/Cards/index"
import { Container, Grid } from 'semantic-ui-react'

const dishes = [
    {
        name: "yoyo",
        price: "500",
        desc: 'you will love it',
        discount: "10%"
    },
    {
        name: "yoyo",
        price: "500",
        desc: 'you will love it',
        discount: "10%"
    },
    {
        name: "yoyo",
        price: "500",
        desc: 'you will love it',
        discount: "10%"
    },
    {
        name: "yoyo",
        price: "500",
        desc: 'you will love it',
        discount: "10%"
    },
    {
        name: "yoyo",
        price: "500",
        desc: 'you will love it',
        discount: "10%"
    },
    {
        name: "yoyo",
        price: "500",
        desc: 'you will love it',
        discount: "10%"
    }
]
const Home = () =>{
    return(
        <div>
            <button onClick={signOut}>Logout</button>
            <Container>
            <Grid stackable columns={4}>
              {dishes
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
