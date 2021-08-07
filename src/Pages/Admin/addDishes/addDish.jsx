import './addDish.scss';
import { useState, useEffect, useContext } from 'react';
import Loader from '../../../Components/Loader/index';
import { UserContext } from '../../../Providers/UserProvider';
import { isUser, isRestaurent } from "../../../Services/Utils";
import { Redirect } from "react-router-dom";
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
    const [loadingBtn,setLoadingBtn] = useState(false);
    const [errMessage, seterrMessage] = useState("");
    const [dishInfo, setDishInfo] = useState({})
    const renderFormElements = () => {
        return formElement.map((ele, index) => (
            <Form.Field>
                <label style={labelStyle} className="label">
                    {ele.labelName}
                </label>
                {ele.isTextArea ?
                    <TextArea placeholder={ele.placeholder} style={{ minHeight: 100 }} />
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

    const handleSubmit = ()=>{

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
                            <Form error={!!errMessage}>
                                {renderFormElements()}
                                <Button primary type="submit" onClick={handleSubmit}>
                                    <Icon name="save" />
                                    {loadingBtn ? "Adding..." : "Register"}
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