  
import React from 'react'
import { Grid, Header, Image, Message } from 'semantic-ui-react'

const RegisterPage = () => (
  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
        <Image src='images/google-logo.jpeg' /> 
      </Header>
      <Message>
        New to us? <a href='#'>Sign Up</a>
      </Message>
    </Grid.Column>
  </Grid>
)

export default RegisterPage