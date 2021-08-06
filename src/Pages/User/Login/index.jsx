  
import React from 'react'
import { Grid, Header, Image, Message, Container, Segment ,  Form, Button} from 'semantic-ui-react'
import "./Login.scss"

const LoginPage = () => (
<Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
<Grid.Column style={{ maxWidth: 450 }}>
  <Container textAlign="center">
                    <Header as='h2' color='teal' textAlign='center'>
                        Welcome user let's Login with google 
                    </Header>
      <Container textAlign="center">
          <Segment>
              <img className="google-login" src='/images/google-logo.jpg' /> 
          </Segment>
      </Container>
    </Container>
  <Message>
      Login and enjoy our service
  </Message>
</Grid.Column>
</Grid>
 )


export default LoginPage;