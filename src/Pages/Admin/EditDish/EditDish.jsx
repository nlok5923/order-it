import './EditDish.scss';
import { useState, useEffect, useContext } from 'react';
import Loader from '../../../Components/Loader/index';
import { Redirect } from "react-router-dom";
import { editDish } from '../../../Services/Restaurent/Dish';
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

const EditDish = (props) => {
    const labelStyle = { fontSize: "15px" };
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
    const renderFormElements = () => {
        return formElement.map((ele, index) => (
            <Form.Field>
                <label style={labelStyle} className="label">
                    {ele.labelName}
                </label>
                {ele.isTextArea ?
                    <TextArea onChange={(e) => setInfo(e)} name={ele.name} required placeholder={ele.placeholder} style={{ minHeight: 150 }} value={dishInfo.description} />
                    :
                    <input
                        type={ele.type}
                        name={ele.name}
                        value={dishInfo[ele.name]}
                        placeholder={ele.placeholder}
                        onChange={(e) => setInfo(e)}
                        required
                    />}
            </Form.Field>
        ));
    };

    const setInfo = (e) => {
        setDishInfo({
            ...dishInfo,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        const dish = props.location.data;
        if (!dish) {
            setredirect("/restaurant");
        } else {
            setDishInfo(dish);
        }
    }, []);

    const handleSubmit = async () => {
        seterrMessage("");
        setLoadingBtn(true);
        try {
            await editDish(dishInfo);
            setredirect("/restaurant")
        } catch (error) {
            setLoadingBtn(false);
            seterrMessage(error.message);
        }
    }

    const handleUpload = (e) => {
        if (e.target.files) {
            seterrMessage("");
            setDishInfo({
                ...dishInfo,
                image: e.target.files[0],
                firebaseImage:""
            })
            document.getElementById("upload-img").value = "";
        }
    }

    if (redirect) {
        return <Redirect to={redirect} />;
    }
    return (
        <div>
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
                            <div className='image-parent'>
                                {dishInfo.image &&
                                    <img src={URL.createObjectURL(dishInfo.image)} alt="food" className="food-slide-image" />
                                }
                                {
                                    (dishInfo.firebaseImage!=="") && 
                                    <img src={dishInfo.firebaseImage} alt="food" className="food-slide-image" />
                                }
                            </div>
                            <Button color="red" type="submit" onClick={handleSubmit}>
                                {loadingBtn ? "Adding..." : "Add"}
                            </Button>
                            <Message error header="Oops!!" content={errMessage} />
                        </Form>
                    </Segment>
                </div>
            </Container>
        </div>
    );
}

export default EditDish;