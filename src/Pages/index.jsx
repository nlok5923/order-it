import Card from "../Components/Cards/index"
import { Container, Grid, Header } from 'semantic-ui-react'
import { getRestaurants } from "../Services/Restaurent/RestaurantServices"
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../Providers/UserProvider";
import { isRestaurent } from '../Services/Utils'
import { NavLink } from "react-router-dom"
import Loader from '../Components/Loader/index';
import DataLoader from '../Components/LoadingData/LoadingData'

const marginTop = { marginTop: "5%" }

export const hello = ()=>{
  Home().fetchData("are")
}

const Home = () => {
  const info = useContext(UserContext);
  const { user, isLoading } = info;
  const [redirect, setredirect] = useState(null);
  const [restaurant, setRestaurants] = useState([]);
  const [loading,setLoading] = useState(true);
  const [loadingData,setLoadingData] = useState(false);

  const fetchData = async (search) => {
    setLoadingData(true);
    let data = await getRestaurants(search);
    setRestaurants(data)
    setLoadingData(false);
  }

  const handleUser = async()=>{
    if(!user){
      fetchData("");
    }else{
      let isrestaurant = await isRestaurent(user.uid);
      if(isrestaurant){
        setredirect("/restaurant");
      }else{
        fetchData("");
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    if(!isLoading){
        handleUser();
    }
  }, [user,isLoading])

  return (
    <div> 
      {loading && <Loader />}
      {!loading && loadingData && <DataLoader />}
      {!loading && !loadingData && <Container >
        <Header as="h1">Search best foods </Header>
        <Grid stackable columns={4}>
          {restaurant
            .map((data) => {
              return (
                <Grid.Column>
                  <Container fluid textAlign="center">
                    <NavLink activeClassName="current" to={"/restaurant/" + data.restaurantId}>
                      <Card info={data} />
                    </NavLink>
                  </Container>
                </Grid.Column>
              );
            })}
        </Grid>
      </Container>}
    </div>
  );
}

export default Home;
