import './addDish.scss';
import { useState, useEffect, useContext } from 'react';
import Loader from '../../../Components/Loader/index';
import { UserContext } from '../../../Providers/UserProvider';
import { Redirect } from "react-router-dom";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import {
    Button,
    Form,
    Container,
    Message,
    Header,
    Segment,
    Icon,
    TextArea
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const AddDish = () => {
    const labelStyle = { fontSize: "15px" };
    const info = useContext(UserContext);
    const { user, isLoading } = info;
    const [loading, setLoading] = useState(true);
    const [redirect, setredirect] = useState(null);
    const formElement = [
        { name: "dishName", labelName: "Enter Dish Name", type: "text", isTextArea: false },
        { name: "price", labelName: "Actual Price", type: "text", isTextArea: false },
        { name: "discount", labelName: "Discount (%)", type: "number", isTextArea: false },
        { name: "description", labelName: "Description", placeholder: "Write Dish Description Here.", isTextArea: true }
    ]
    const [loadingBtn, setLoadingBtn] = useState(false);
    const [errMessage, seterrMessage] = useState("");
    const [dishInfo, setDishInfo] = useState({})
    const [images, setImages] = useState([]);
    let [count, setCount] = useState(0);
    const renderFormElements = () => {
        return formElement.map((ele, index) => (
            <Form.Field>
                <label style={labelStyle} className="label">
                    {ele.labelName}
                </label>
                {ele.isTextArea ?
                    <TextArea required placeholder={ele.placeholder} style={{ minHeight: 150 }} />
                    :
                    <input
                        type={ele.type}
                        name={ele.name}
                        placeholder={ele.placeholder}
                        onChange={(e) => setInfo(e)}
                        required
                    />}
            </Form.Field>
        ));
    };

    const renderImages = () => {
        return (
            <div className="slide-container">
                {(images.length > 0) && <Slide>
                    {
                        images.map((image,index)=>(
                            <div className="each-slide" key={index}>
                                <img src={URL.createObjectURL(image.url)} alt="food" className="food-slide-image" />
                                <Icon className="delete-img" size="large" name="trash" onClick={()=>deleteImg(image.id)}></Icon>
                            </div>
                        ))
                    }
                </Slide>}
            </div>
        );
    }

    const setInfo = (e) => {
        setDishInfo({
            ...dishInfo,
            [e.target.name]: e.target.value,
        });
    };

    const handleUser = async () => {
        if (user.isUser) {
            setredirect("/");
            return;
        }
        if (!user.isRestaurant) {
            setredirect("/restaurant/details");
        }
        setLoading(false);
    }

    useEffect(() => {
        if (!isLoading) {
            if (!user) {
                setredirect("/restaurant/login");
            } else {
                handleUser();
            }
        }
    }, [user, isLoading]);

    const handleSubmit = async() => {
        if(images.length===0){
            seterrMessage("Please Upload Atleast One Image")
            return;
        }
        setDishInfo({
            ...dishInfo,
            images
        })
        setLoadingBtn(true);
        try {
            // await addDish(dishInfo);
        } catch (error) {
            seterrMessage(error.message);
        }
        setLoadingBtn(false);
    }

    const deleteImg = (id)=>{
        setImages(images.filter((img) => img.id !== id));
    }

    const handleUpload = (e) => {
        if (e.target.files) {
            setImages([...images, { url: e.target.files[0], id: count }]);
            setCount(count + 1);
            document.getElementById("upload-img").value = "";
        }
    }

    if (redirect) {
        return <Redirect to={redirect} />;
    }
    return (
        <div>
            {(loading || isLoading) && <Loader />}
            {!loading && !isLoading &&
                <Container>
                    <div>
                        <Segment>
                            <Header as="h2">
                                <Header.Content>Add Your Dish Here.</Header.Content>
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
                                <div>
                                    {renderImages()}
                                </div>
                                <Button color="red" type="submit" onClick={handleSubmit}>
                                    {loadingBtn ? "Adding..." : "Add"}
                                </Button>
                                <Message error header="Oops!!" content={errMessage} />
                            </Form>
                        </Segment>
                    </div>
                </Container>
            }
        </div>
    );
}

export default AddDish;