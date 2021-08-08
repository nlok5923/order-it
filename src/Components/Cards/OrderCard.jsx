import { Card, Header, Icon, Button, Label,Table } from "semantic-ui-react"

const showTable = (orderItem) => {
  return (
    <div>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>discount</Table.HeaderCell>
            <Table.HeaderCell>Discounted price</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {orderItem.map((element, index) => (
            <Table.Row>
              <Table.Cell>{element.dishName}</Table.Cell>
              <Table.Cell>{element.quantity}</Table.Cell>
              <Table.Cell>Rs {element.price}</Table.Cell>
              <Table.Cell>{element.discount}%</Table.Cell>
              <Table.Cell>Rs {element.discountedPrice}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

    </div>
  );
}

const getAmountSum = (items) => {
  let amount = 0;
  items.map(item => amount += (item.discountedPrice * item.quantity));
  return amount;
}

const OrderCard = (props) => {

  const getColor = (status)=>{
    if(status==="dispatched"){
       return "orange";
    }
    if(status==="delivered"){
      return "green";
    }
    if(status==="processing"){
      return "blue";
    }
  }

  return (
    <Card fluid>
      {<Label color={getColor(props.orders.status)} key={"orange"}>
        {props.orders.status}
      </Label>
      }

      <Card.Content
        header={
          <Header as="h2">
            <Icon name="money" />
            <Header.Content>
              <Header.Subheader> Order </Header.Subheader>
            </Header.Content>
          </Header>
        }
      />
      <Card.Content>
        <p>Date : {props.orders.date}</p>
        <p>Total Amount : {getAmountSum(props.orders.orderItem)}</p>
        <p>Address : {props.orders.shippingDetail.address + ", " + props.orders.shippingDetail.city + ", " + props.orders.shippingDetail.pincode + ", " + props.orders.shippingDetail.country}</p>
        {showTable(props.orders.orderItem)}
      </Card.Content>
    </Card>
  )
}

export default OrderCard;