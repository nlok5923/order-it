import React from 'react'
import { Card, Icon, Image, Label, Button } from 'semantic-ui-react'

const CardExampleCard = (props) => (
  <Card>
    <Label color='red' floating>{props.info.discount}</Label>
    <Image src='/images/pizza.jpg' wrapped ui={false} />
    <Card.Content>
      <Card.Header>{props.info.name}</Card.Header>     
      <Card.Description>
        <span className='date'><strike>{props.info.price}</strike> Rs 100</span>
      </Card.Description>
    </Card.Content>
    <Card.Content>
      {props.isCart ?  
      <div>
      <Button
          icon="trash"
          color="red"
          floated="right"
        />
        <Button 
        icon="buy"
        color="green"
        floated="right"
        />
      </div>       
       : null }
    </Card.Content>
  </Card>
)

export default CardExampleCard