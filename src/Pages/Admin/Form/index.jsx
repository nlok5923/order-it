import { useEffect, useContext, useState } from 'react';
import { UserContext } from '../../../Providers/UserProvider'
import { Redirect } from "react-router-dom";
import { isUser, isRestaurent } from '../../../Services/Utils'
import { saveRestaurantDetail } from '../../../Services/Restaurent/RestaurentAuth';
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
  const [loadingBtn,setLoadingBtn] = useState(false);
  const formElement = [
    { name: "restaurantName", type: "text" },
    { name: "country", type: "text" },
    { name: "city", type: "text" },
    { name: "pincode", type: "number" },
    { name: "phone", type: "number" },
    { name: "address", type: "text" }
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
          onChange={(e) => setInfo(e)}
          required
        />
      </Form.Field>
    ));
  };

  const [errMessage, seterrMessage] = useState("");
  const [adminInfo, setAdminInfo] = useState({
    restaurantName: "",
    country: "",
    city: "",
    pincode: "",
    address: "",
    phone: "",
    name:"",
    email:"",
    id:""
  });
  const info = useContext(UserContext);
  const { user, isLoading } = info;
  const [redirect, setredirect] = useState(null);

  const setInfo = (e) => {
    setAdminInfo({
      ...adminInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async()=>{
    setLoadingBtn(true);
    await saveRestaurantDetail(adminInfo);
    setLoadingBtn(false);
    setredirect("/restaurant");
  }

  const handleUser = async()=>{
    let isuser = await isUser(user.uid);
    if(isuser){
      setredirect("/");
      return;
    }
    let isrestaurant = await isRestaurent(user.uid);
    if(isrestaurant){
      setredirect("/restaurant");
    }else{
      setAdminInfo({
        ...adminInfo,
        name:user.displayName,
        email:user.email,
        id:user.uid
      })
    }
  }

  useEffect(() => {
    if (user && !isLoading) {
        handleUser();
    }else if(!user && !isLoading){
      setredirect("/admin/login")
    }
  }, [user, isLoading]);

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  return (
    <Container>
      <div>
        <Segment>
          <Header as="h2" icon textAlign="center">
            <Icon name="address book outline" circular />
            <Header.Content>Complete Your Profile By Filling Below Details </Header.Content>
          </Header>
          <Form error={!!errMessage}>
            {renderFormElements()}
            <Button primary type="submit" onClick={handleSubmit}>
              <Icon name="save" />
              {loadingBtn?"Loading...":"Register"}
            </Button>
            <Message error header="Oops!!" content={errMessage} />
          </Form>
        </Segment>
      </div>
    </Container>
  );
};

export default SignupForm;
