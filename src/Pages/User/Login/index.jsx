import { Grid, Header, Image, Message, Container, Segment, Form, Button } from 'semantic-ui-react'
import { signInWithGoogle } from '../../../Services/User/UserAuth';
import { useEffect, useContext, useState } from 'react';
import { UserContext } from '../../../Providers/UserProvider'
import { Redirect } from "react-router-dom";
import "./Login.scss"

const LoginPage = () => {
  
  const info = useContext(UserContext);
  const { user, isLoading } = info;
  const [redirect, setredirect] = useState(null);
  
  useEffect(() => {
    if (user && !isLoading) {
        setredirect("/");
    }
  }, [user, isLoading]);

  if (redirect) {
    return <Redirect to={redirect} />;
  }
  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Container textAlign="center">
          <Header as='h2' color='teal' textAlign='center'>
            Welcome user let's Login with google
          </Header>
          <Container textAlign="center">
            <Segment>
              <img onClick={signInWithGoogle} className="google-login" alt="sign in with google" src='/images/google-logo.jpg' />
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