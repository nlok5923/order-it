import React from "react"
import { Menu, Dropdown, Form, Button, Icon } from "semantic-ui-react"
import { useHistory } from "react-router"
import { Link } from "react-router-dom"

const Navbar = () => {

    const trigger = (
        <span>
          <Icon name='user' /> Restaurant 
        </span>
      )

    const history = useHistory();
    const handleCategorySelection = (e, data) => {
        switch(data.value){
        case "ulogin": history.push("/user/login")
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
    
    const optionRegister = [{
        key:1 , text :"Restaurant Login" , value: "rlogin"
    },{ key:2, text: "Restaurant Register", value:"rregister"}]

    return(
        <Menu>
        <Menu.Item header>Order it </Menu.Item>
        <Menu.Item>
            <Link to="/user/login"> Login / Register </Link>
            </Menu.Item>
            <Menu.Item>
            <Form>
                <Form.Field>
                    <input type="text" placeholder="Enter pincode" />
                </Form.Field>
            </Form>
            </Menu.Item>

            <Menu.Item>
            <Form>
                <Form.Field>
                    <input type="text" placeholder="Enter food name" />
                </Form.Field>
            </Form>
            </Menu.Item>

            <Menu.Item position="right">
            <Dropdown trigger={trigger} options={optionRegister} onChange={(e, data) => handleCategorySelection(e, data)} />
            </Menu.Item>


      </Menu>
    )
}

export default Navbar;