import React from "react"
import { Table, Dropdown } from "semantic-ui-react"
import "./Table.scss"

const Orders = (props) => {

const status = [
    {key:1 , text: "dispatced", value: "dispatched"},
    {key:2 , text: "processing", value: "processing"},
    {key:3 , text: "delivered", value: "delivered"},
]
    return(
    <div>
        <div>
             <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Price</Table.HeaderCell>
                <Table.HeaderCell>discount</Table.HeaderCell>
                <Table.HeaderCell>discounted Price</Table.HeaderCell>
                <Table.HeaderCell>Update Status</Table.HeaderCell>
                <Table.HeaderCell>Quantity</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {props.info.map((element, index) => (
                <Table.Row>
                  <Table.Cell>{element.dishName}</Table.Cell>
                  <Table.Cell>Rs {element.price}</Table.Cell>
                  <Table.Cell>{element.discount}%</Table.Cell>
                  <Table.Cell>{element.discountedPrice}</Table.Cell>
                  <Table.Cell>
                      <Dropdown 
                      clearable
                      options = {status}
                      placeholder="Set order status"
                      />
                  </Table.Cell>
                  <Table.Cell>
                      {element.quantity}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>

            </div>
    </div>
    )
}

export default Orders;