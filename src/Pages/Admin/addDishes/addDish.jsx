import './addDish.scss';
import { useState, useEffect, useContext } from 'react';
import Loader from '../../../Components/Loader/index';
import { UserContext } from '../../../Providers/UserProvider';
import { Redirect } from "react-router-dom";
import { addDish } from '../../../Services/Restaurent/Dish';
import {isUser,isRestaurent} from '../../../Services/Utils'
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
    const renderFormElements = () => {
        return formElement.map((ele, index) => (
            <Form.Field>
                <label style={labelStyle} className="label">
                    {ele.labelName}
                </label>
                {ele.isTextArea ?
                    <TextArea onChange={(e) => setInfo(e)} name={ele.name} required placeholder={ele.placeholder} style={{ minHeight: 150 }} />
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

    const setInfo = (e) => {
        setDishInfo({
            ...dishInfo,
            [e.target.name]: e.target.value,
        });
    };

    const handleUser = async () => {
        let isuser = await isUser(user.uid);
        if (isuser) {
            setredirect("/");
            return;
        }
        let isrestaurant = await isRestaurent(user.uid);
        if (!isrestaurant) {
            setredirect("/restaurant/details");
        }else{
            setDishInfo({
                ...dishInfo,
                uid:user.uid
            })
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
        if(!dishInfo.image){
            seterrMessage("Please Upload a Image of Your Dish")
            return;
        }
        seterrMessage("");
        setLoadingBtn(true);
        try {
            await addDish(dishInfo);
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
                image:e.target.files[0]
            })
            // setImages([...images, { url: e.target.files[0], id: count }]);
            // setCount(count + 1);
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
                                <div className='image-parent'>
                                    {dishInfo.image && 
                                        <img src={URL.createObjectURL(dishInfo.image)} alt="food" className="food-slide-image" />
                                    }
                                </div>
                                <Button 
                                color="red" 
                                style={{ marginTop:"2%" }}
                                type="submit" onClick={handleSubmit}>
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