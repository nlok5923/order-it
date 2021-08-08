import React from "react"
import { Table, Button, Container, Form } from "semantic-ui-react"
import "./Table.scss"
import { deleteCartItem } from "../../Services/User/UserServices"

const CartItems = (props) => {
  const deleteCartItemById = (userid, id) => {
    props.handleDelete(userid, id);
  }

  return (<div>{props.isOrder ?
    <div>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>discount</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {props.info.map((element, index) => (
            <Table.Row>
              <Table.Cell>{element.data.dishName}</Table.Cell>
              <Table.Cell>Rs {element.data.price}</Table.Cell>
              <Table.Cell>{element.data.discount}%</Table.Cell>
              <Table.Cell>{element.data.description}</Table.Cell>
              <Table.Cell>
                {element.quantity}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

    </div>
    :
    <div>
      <h2>From {props.info[0].data.restaurantName}</h2>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>discount</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {props.info.map((element, index) => (
            <Table.Row>
              <Table.Cell>{element.data.dishName}</Table.Cell>
              <Table.Cell>Rs {element.data.price}</Table.Cell>
              <Table.Cell>{element.data.discount}%</Table.Cell>
              <Table.Cell>{element.data.description}</Table.Cell>
              <Table.Cell>
                {element.quantity}
              </Table.Cell>
              <Table.Cell>
                <Button
                  icon="trash"
                  color="red"
                  onClick={() => deleteCartItemById(props.userid, element.itemId)}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  }
  </div>
  )
}

export default CartItems;