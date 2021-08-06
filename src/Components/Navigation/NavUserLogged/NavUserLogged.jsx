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
            case "logout": signOut();
                break;
            case "uregister": history.push("/user/login")
                break;
            case "alogin": history.push("/admin/login")
                break;
            case "aregister": history.push("/admin/login")
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
        <Menu>
            <Menu.Item header>Order it </Menu.Item>
            <Menu.Item>
                <Form>
                    <Form.Field>
                        <input type="text" placeholder="search food" />
                    </Form.Field>
                </Form>
            </Menu.Item>

            <Menu.Item position="right">
                <Dropdown trigger={trigger} options={userOptions} onChange={(e, data) => handleCategorySelection(e, data)} />
            </Menu.Item>

        </Menu>
    )
}

export default Navbar;