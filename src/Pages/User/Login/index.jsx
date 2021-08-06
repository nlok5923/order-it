  
import React from 'react'
import { Grid, Header, Image, Message, Container, Segment } from 'semantic-ui-react'
import "./Login.scss"

const LoginPage = () => (
    <div className="login-display">
    <Grid celled="internally">
        <Grid.Row>
            <Grid.Column>
                <Segment>
                <Container textAlign="center">
                    <Header as='h2' color='teal' textAlign='center'>
                        Login with google 
                    </Header>
      <Container textAlign="center">
          <Segment>
              <img className="google-login" src='/images/google-logo.jpg' /> 
          </Segment>
      </Container>
    </Container>
    </Segment>
    </Grid.Column>
    </Grid.Row>
    </Grid>
    </div>
)

export default LoginPage;