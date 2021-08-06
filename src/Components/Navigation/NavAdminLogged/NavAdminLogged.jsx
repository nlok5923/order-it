import React from "react"
import { Menu, Dropdown, Form, Button } from "semantic-ui-react"
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
    
    const restaurantOptions = [
        {key:1 , text: "Log out", value: "logout"},
        {key:2, text: "orders", value:"orders"}
    ]

    return(
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
            <Button.Group color='teal'>
    <Button>username</Button>
    <Dropdown
      className='button icon'
      floating
      options={restaurantOptions}
      trigger={<></>}
      onChange={(e, data) => handleCategorySelection(e, data)}
    />
  </Button.Group>
            </Menu.Item>

      </Menu>
    )
}

export default Navbar;