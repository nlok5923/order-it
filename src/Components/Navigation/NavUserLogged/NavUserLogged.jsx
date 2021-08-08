import React from "react"
import { Menu, Dropdown, Form, Button, Icon } from "semantic-ui-react"
import { useHistory } from "react-router"
import { Link } from "react-router-dom"
import { signOut } from "../../../Services/Utils"

const Navbar = () => {

    const trigger = (
        <span>
            <Icon name='user' /> Hello, User
        </span>
    )

    const history = useHistory();
    const handleCategorySelection = (e, data) => {
        switch (data.value) {
            case "logout":  signOut(); history.push("/"); 
                break;
            case "mycart": history.push("/user/cart")
                break;
            case "myorders": history.push("/user/orders")
                break;
            default:
        }

    }

    const userOptions = [
        { key: 2, text: "My cart", value: "mycart" },
        { key: 3, text: "My orders", value: "myorders" },
        { key: 1, text: "Log out", value: "logout" }
    ]

    return (
        <div className="menu">
        <Menu>
            <Menu.Item header>
               <Link>
                Order it
                </Link>
                 </Menu.Item>
            <Menu.Item>
            <Form>
                <Form.Field>
                    <input type="text" placeholder="Enter pincode" />
                </Form.Field>
            </Form>
            </Menu.Item>

            <Menu.Item position="right" style={{ width:"70%" }}>
            <Form>
                <Form.Field>
                    <input 
                    className="search-bar-width" 
                    style={{ width: "60vw" }} 
                    type="text" 
                    placeholder="Enter food name/restaurant name" />
                </Form.Field>
            </Form>
            </Menu.Item>

            <Menu.Item position="right">
                <Dropdown trigger={trigger} options={userOptions} onChange={(e, data) => handleCategorySelection(e, data)} />
            </Menu.Item>

        </Menu>
        </div>
    )
}

export default Navbar;