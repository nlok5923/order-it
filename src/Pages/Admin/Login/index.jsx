  
import React from 'react'
import { Grid, Header, Image, Message, Container, Segment } from 'semantic-ui-react'
import "./Login.scss"

const LoginPage = () => (
    <Grid celled="internally">
        <Grid.Row>
            <Grid.Column>
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
    </Grid.Column>
    </Grid.Row>
    </Grid>
)

export default LoginPage;