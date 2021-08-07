import React from "react"
import { Table, Button, Container, Form } from "semantic-ui-react"
import "./Table.scss"

const CartItems = (props) => {
    return(<div>{props.isOrder ?
        <div>
             <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>image</Table.HeaderCell>
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
                  <Table.Cell content="center">
                      <img src="/images/pizza.jpg"  alt="pizza" className="food-image" />
                  </Table.Cell>
                  <Table.Cell>{element.name}</Table.Cell>
                  <Table.Cell>{element.price}</Table.Cell>
                  <Table.Cell>{element.discount}</Table.Cell>
                  <Table.Cell>{element.desc}</Table.Cell>
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
            <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>image</Table.HeaderCell>
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
                  <Table.Cell content="center">
                      <img src="/images/pizza.jpg"  alt="pizza" className="food-image" />
                  </Table.Cell>
                  <Table.Cell>{element.name}</Table.Cell>
                  <Table.Cell>{element.price}</Table.Cell>
                  <Table.Cell>{element.discount}</Table.Cell>
                  <Table.Cell>{element.desc}</Table.Cell>
                  <Table.Cell>
                      <Form>
                          <Form.Field>
                      <input type="number" name="quantity" />
                          </Form.Field>
                      </Form>
                  </Table.Cell>
                  <Table.Cell><Button icon="trash" color="red" /></Table.Cell>
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