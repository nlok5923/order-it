import { useEffect, useContext, useState } from 'react';
import { UserContext } from '../../../Providers/UserProvider'
import { Redirect, useHistory } from "react-router-dom";
import 'react-slideshow-image/dist/styles.css'
import { saveRestaurantDetail } from '../../../Services/Restaurent/RestaurentAuth';
import { Slide } from 'react-slideshow-image';
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
import { isUser, isRestaurent } from '../../../Services/Utils'
import "./Form.scss";

const SignupForm = () => {
  const history = useHistory();
  const labelStyle = { fontSize: "15px" };
  const [loadingBtn, setLoadingBtn] = useState(false);
  const formElement = [
    { name: "RestaurantName", type: "text", isTextarea: false },
    { name: "country", type: "text", isTextarea: false },
    { name: "city", type: "text", isTextarea: false },
    { name: "pincode", type: "number", isTextarea: false },
    { name: "phone", type: "number", isTextarea: false },
    { name: "address", type: "text", isTextarea: false },
    { name: "discount", type: "number", isTextarea: false },
    { name: "description", type: "text", isTextarea: true },
  ];

  const renderFormElements = () => {
    return formElement.map((ele, index) => (
      <Form.Field>
        <label style={labelStyle} className="label">
          {ele.name}
        </label>
        {ele.isTextarea ? (
          <textarea name={ele.name} type={ele.type} onChange={(e) => setInfo(e)} />
        ) : (
          <input
            type={ele.type}
            name={ele.name}
            placeholder={ele.placeholder}
            onChange={(e) => setInfo(e)}
            required
          />
        )}
      </Form.Field>
    ));
  };

  const [errMessage, seterrMessage] = useState("");
  const [adminInfo, setAdminInfo] = useState({
    RestaurantName: "",
    country: "",
    city: "",
    pincode: "",
    address: "",
    phone: "",
    name: "",
    email: "",
    id: "",
    description: "",
    discount: ""
  });
  const info = useContext(UserContext);
  const { user, isLoading } = info;
  const [redirect, setredirect] = useState(null);
  const [images, setImages] = useState([]);
  let [count, setCount] = useState(0);

  const setInfo = (e) => {
    setAdminInfo({
      ...adminInfo,
      [e.target.name]: e.target.value,
    });
  };

  const deleteImg = (id) => {
    setImages(images.filter((img) => img.id !== id));
  }

  const handleSubmit = async () => {
    setLoadingBtn(true);
    await saveRestaurantDetail(adminInfo,images);
    setLoadingBtn(false);
    setredirect("/restaurant")
  }

  const handleUser = async () => {
    let isuser = await isUser(user.uid);
    if (isuser) {
      setredirect("/");
      return;
    }
    let isrestaurant = await isRestaurent(user.uid);
    if (isrestaurant) {
      setredirect("/restaurant");
    } else {
      setAdminInfo({
        ...adminInfo,
        name: user.displayName,
        email: user.email,
        id: user.uid,
      });
    }
  };

  const renderImages = () => {
    return (
      <div className="slide-container">
        {(images.length > 0) && <Slide>
          {
            images.map((image, index) => (
              <div className="each-slide" key={index}>
                <img src={URL.createObjectURL(image.url)} alt="food" className="restaurant-slide-image" />
                <Icon className="delete-img" size="large" name="trash" onClick={() => deleteImg(image.id)}></Icon>
              </div>
            ))
          }
        </Slide>}
      </div>
    );
  }

  useEffect(() => {
    if (user && !isLoading) {
      handleUser();
    } else if (!user && !isLoading) {
      setredirect("/admin/login");
    }
  }, [user, isLoading]);

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  const handleUpload = (e) => {
    if (e.target.files) {
      seterrMessage("");
      setImages([...images, { url: e.target.files[0], id: count }]);
      setCount(count + 1);
      document.getElementById("upload-img").value = "";
    }
  }

  return (
    <Container>
      <div className="detail-form">
        <Segment>
          <Header as="h2" icon textAlign="center">
            <Icon name="address book outline" circular />
            <Header.Content>
              Complete Your Profile By Filling Below Details{" "}
            </Header.Content>
          </Header>
          <Form error={!!errMessage}>
            {renderFormElements()}
            <div>
              <label className="upload-img-btn" htmlFor="upload-img">
                <Icon name="cloud upload"></Icon> Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                id="upload-img"
                onChange={(e) => handleUpload(e)}
              ></input>
            </div>
            {renderImages()}
            <Button primary type="submit" onClick={handleSubmit}>
              <Icon name="save" />
              {loadingBtn ? "Loading..." : "Register"}
            </Button>
            <Message error header="Oops!!" content={errMessage} />
          </Form>
        </Segment>
      </div>
    </Container>
  );
};

export default SignupForm;
