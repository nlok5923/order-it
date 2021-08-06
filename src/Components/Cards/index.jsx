import React from 'react'
import { Card, Icon, Image, Label } from 'semantic-ui-react'

const CardExampleCard = (props) => (
  <Card>
    <Label color='red' floating>{props.info.discount}</Label>
    <Image src='/images/pizza.jpg' wrapped ui={false} />
    <Card.Content>
      <Card.Header>{props.info.name}</Card.Header>     
      <Card.Description>
          {props.info.desc}
      </Card.Description>
      <Card.Meta>
        <span className='date'>{props.info.price}</span>
      </Card.Meta>
    </Card.Content>
  </Card>
)

export default CardExampleCard