import React from "react";
import { Menu, Dropdown, Form, Button, Icon } from "semantic-ui-react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { signOut } from "../../../Services/Utils";

const Navbar = () => {

  const history = useHistory();
  const trigger = (
    <span>
      <Icon name="user" /> Hello, Restaurant
    </span>
  );

  const handleCategorySelection = (e, data) => {
    switch (data.value) {
      case "logout":
        signOut();
        history.push("/");
        break;
      case "orders":
        history.push("/admin/orders");
        break;
      default:
    }
  };

  const restaurantOptions = [
    { key: 2, text: "orders", value: "orders" },
    { key: 1, text: "Log out", value: "logout" },
  ];

  return (
    <div className="menu">
      <Menu className="menu">
        <Menu.Item header>Order it </Menu.Item>
        <Menu.Item position="right">
          <Dropdown
            trigger={trigger}
            options={restaurantOptions}
            onChange={(e, data) => handleCategorySelection(e, data)}
          />
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Navbar;

//
