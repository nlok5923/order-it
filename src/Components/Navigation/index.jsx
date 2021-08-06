import React from "react"
import { Menu, Dropdown, Form } from "semantic-ui-react"
import { useHistory } from "react-router"

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

    const options = [{
        key:1 , text :"User login" , value: "ulogin"
    },{ key:2, text: "Admin login ", value: "alogin"} ]

    
    const optionRegister = [{
        key:1 , text :"User register" , value: "uregister"
    },{ key:2, text: "Admin register ", value:"aregister"}]

    return(
        <Menu>
        <Menu.Item header>Order it </Menu.Item>
        <Menu.Item>
        <Dropdown
              floated="right"
              clearable
              options={options}
              name="category"
              selection
              onChange={(e, data) => handleCategorySelection(e, data)}
            />
            </Menu.Item>
            <Menu.Item>
        <Dropdown
              floated="right"
              clearable
              options={optionRegister}
              value={"data"}
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