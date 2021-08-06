import { useState, useEffect } from "react";
import {
  Button,
  Form,
  Container,
  Message,
  Header,
  Segment,
  Icon,
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const SignupForm = () => {
  const labelStyle = { fontSize: "15px" };

  const formElement = [
      { name: "name", type:"text"},
      { name:"country", type: "number"},
      {name:"city" , type:"text"},
      { name: "pin" , type: "number"},
      {name: "phone", type:"number"},
      {name:"address", type:"text"}
  ]

  const renderFormElements = () => {
    return formElement.map((ele, index) => (
      <Form.Field>
        <label style={labelStyle} className="label">
          {ele.name}
        </label>
        <input
          type={ele.type}
          name={ele.name}
          placeholder={ele.placeholder}
          onChange ={(e) => setInfo(e)}
        />
      </Form.Field>
    ));
  };

  const [errMessage, seterrMessage] = useState("");
  const [adminInfo, setAdminInfo] = useState({
    name: "",
    country: "",
    city: "",
    pin: "",
    address: "",
    phone: ""
  });

  const setInfo = (e) => {
    setAdminInfo({
      ...adminInfo,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <Container>
        <div>
          <Segment>
            <Header as="h2" icon textAlign="center">
              <Icon name="address book outline" circular />
              <Header.Content>Please fill details </Header.Content>
            </Header>
            <Form error={!!errMessage}>
              {renderFormElements()}
              <Button primary type="submit">
                  <Icon name="save" />
                Register
              </Button>
              <Message error header="Oops!!" content={errMessage} />
            </Form>
          </Segment>
        </div>
    </Container>
  );
};

export default SignupForm;
