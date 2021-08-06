import React from "react"
import { Menu, Dropdown, Form } from "semantic-ui-react"
import { useHistory } from "react-router"
import { Link } from "react-router-dom"

const Navbar = () => {

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
        key:1 , text :"User register" , value: "uregister"
    },{ key:2, text: "Admin register ", value:"aregister"}]

    return(
        <Menu>
        <Menu.Item header>Order it </Menu.Item>
        <Menu.Item>
            <Link to="/user/login"> Login / Register </Link>
            </Menu.Item>
            <Menu.Item>
        <Dropdown
              floated="right"
              clearable
              placeholder="hotel login"
              options={optionRegister}
              name="login"
              selection
              onChange={(e, data) => handleCategorySelection(e, data)}
            />
            </Menu.Item>
            <Menu.Item>
            <Form>
                <Form.Field>
                    <input type="text" placeholder="search food" />
                </Form.Field>
            </Form>
            </Menu.Item>

      </Menu>
    )
}

export default Navbar;