import Card from "../../../Components/Cards/index"
import { Container, Grid, Header,Message } from 'semantic-ui-react'
import { searchRestaurants } from "../../../Services/Restaurent/RestaurantServices"
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../../Providers/UserProvider";
import { isRestaurent } from '../../../Services/Utils'
import { NavLink,Redirect } from "react-router-dom"
import Loader from '../../../Components/Loader/index';
import DataLoader from '../../../Components/LoadingData/LoadingData'
import { useParams } from "react-router";

const Home = () => {
  const info = useContext(UserContext);
  const { user, isLoading } = info;
  const [redirect, setredirect] = useState(null);
  const [heading,setHeading] = useState("");
  const [restaurant, setRestaurants] = useState([]);
  const [loading,setLoading] = useState(true);
  const [loadingData,setLoadingData] = useState(false);
  const { pinCode,searchText } = useParams();

  const fetchData = async () => {
    setLoadingData(true);
    let data = await searchRestaurants(pinCode,searchText);
    setRestaurants(data)
    setLoadingData(false);
  }

  const handleUser = async()=>{
    if(!user){
      fetchData();
    }else{
      let isrestaurant = await isRestaurent(user.uid);
      if(isrestaurant){
        setredirect("/restaurant");
      }else{
        fetchData();
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    if(!isLoading){
        let head = (searchText==="no"?"Food":searchText) +  " Delivery Restaurants " + (pinCode==="xxx"?"":`at ${pinCode}`);
        setHeading(head);
        handleUser();
    }
  }, [user,isLoading,pinCode,searchText])
  if (redirect) {
    return <Redirect to={redirect} />;
  }
  return (
    <div> 
      {loading && <Loader />}
      {!loading && loadingData && <DataLoader />}
      {!loading && !loadingData && <Container >
        <Header as="h1">{heading}</Header>
        <Grid stackable columns={4}>
          {restaurant && restaurant.length>0 && restaurant
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
            { restaurant.length===0 &&
              <Message>
                <Message.Header>Oops!</Message.Header>
                <p>
                  We could not understand what you mean,try rephrasing the query.
                </p>
              </Message>
            }
        </Grid>
      </Container>}
    </div>
  );
}

export default Home;
