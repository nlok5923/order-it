import React from "react";
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

  return (
    <div className="menu">
      <Menu className="menu">
        <Menu.Item header>Order it </Menu.Item>
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
              <input type="text" placeholder="Enter pincode" />
            </Form.Field>
          </Form>
        </Menu.Item>

        <Menu.Item position="right" style={{ width: "70%" }}>
          <Form>
            <Form.Field>
              <input
                className="search-bar-width"
                style={{ width: "60vw" }}
                type="text"
                placeholder="Enter food name/restaurant name"
              />
            </Form.Field>
          </Form>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Navbar;
