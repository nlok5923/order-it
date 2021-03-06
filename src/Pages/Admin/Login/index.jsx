import { signInForRestaurant } from '../../../Services/Restaurent/RestaurentAuth';
import { useEffect, useContext, useState } from 'react';
import { UserContext } from '../../../Providers/UserProvider'
import { Grid, Header, Message, Container, Segment } from 'semantic-ui-react'
import { Redirect } from "react-router-dom";
import {isUser,isRestaurent} from '../../../Services/Utils'
import "./Login.scss"

const LoginPage = () => {
  const info = useContext(UserContext);
  const { user, isLoading } = info;
  const [redirect, setredirect] = useState(null);

  const handleUser = async()=>{
    let isuser = await isUser(user.uid)
    if(isuser){
      setredirect("/");
      return;
    }
    let isrestaurant = await isRestaurent(user.uid);
    if(isrestaurant){
      setredirect("/restaurant");
    }else{
      setredirect("/restaurant/details")
    }
  }

  useEffect(() => {
    if (user && !isLoading) {
        handleUser();
    }
  }, [user, isLoading]);

  if (redirect) {
    return <Redirect to={redirect} />;
  }
  return (
    <Grid textAlign='center' style={{ height: '70vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Container textAlign="center">
          <Header as='h2' color='teal' textAlign='center'>
            Welcome Restaurant let's get authenticated
          </Header>
          <Container textAlign="center">
            <Segment>
              <img onClick={signInForRestaurant} alt="signInWithGoogle" className="google-login" src='/images/google-logo.jpg' />
            </Segment>
          </Container>
        </Container>
        <Message>
          Login and enjoy our service
        </Message>
      </Grid.Column>
    </Grid>
  );
}


export default LoginPage;