import {useState} from "react";
import { Menu, Dropdown, Form, Button, Icon } from "semantic-ui-react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import "./NavGeneral.scss";

const Navbar = () => {
  const trigger = (
    <span>
      <Icon name="user" /> Restaurant
    </span>
  );
  const [pinCode,setPinCode] = useState("");
  const [searchText,setSearch ] = useState(""); 
  const history = useHistory();
  const handleCategorySelection = (e, data) => {
    switch (data.value) {
      case "ulogin":
        history.push("/user/login");
        break;
      case "uregister":
        history.push("/user/login");
        break;
      case "rlogin":
        history.push("/admin/login");
        break;
      case "rregister":
        history.push("/admin/login");
        break;
      default:
    }
  };

  const optionRegister = [
    {
      key: 1,
      text: "Restaurant Login",
      value: "rlogin",
    },
    { key: 2, text: "Restaurant Register", value: "rregister" },
  ];

  const handleSearch = ()=>{
    if(pinCode==="" && searchText===""){
      return;
    }
    let url = "/search/" + ((pinCode==="")?"xxx":pinCode) +"/" + ((searchText==="")?"no":searchText.toLowerCase());
    history.push(url);
  }

  return (
    <div className="menu">
      <Menu className="menu">
        <Menu.Item header> <Link activeClassName="current" to="/">
         Order it 
         </Link></Menu.Item>
        <Menu.Item>
          <Link to="/user/login"> Login / Register </Link>
        </Menu.Item>
        <Menu.Item>
          <Menu.Item position="left">
            <Dropdown
              trigger={trigger}
              options={optionRegister}
              onChange={(e, data) => handleCategorySelection(e, data)}
            />
          </Menu.Item>

          <Form>
            <Form.Field>
              <input type="text" onChange={(e)=>setPinCode(e.target.value.trim())} placeholder="Enter pincode" />
            </Form.Field>
          </Form>
        </Menu.Item>

        <Menu.Item position="left">
          <Form>
            <Form.Field>
              <input
                onChange={(e)=>setSearch(e.target.value.trim())}
                className="search-bar-width"
                style={{ width: "40vw" }}
                type="text"
                placeholder="Enter food name/restaurant name"
              />
            </Form.Field>
          </Form>
        </Menu.Item>
        <Menu.Item>
          <Button onClick={handleSearch}>Search</Button>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Navbar;
