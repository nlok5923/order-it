import { React, useEffect, useState } from "react"
import { Table, Dropdown } from "semantic-ui-react"
import "./Table.scss"
import { getDiscountedPrice } from "../../Services/Utils"

const Orders = (props) => {
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
                <Table.HeaderCell>Quantity</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {props.info.map((element, index) => (
                <Table.Row>
                  <Table.Cell>{element.dishName}</Table.Cell>
                  <Table.Cell>Rs {element.price}</Table.Cell>
                  <Table.Cell>{element.discount}%</Table.Cell>
                  <Table.Cell>
                    
                    {element.discountedPrice === undefined ? getDiscountedPrice(element.price, element.discount) : element.discountedPrice}
                    
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