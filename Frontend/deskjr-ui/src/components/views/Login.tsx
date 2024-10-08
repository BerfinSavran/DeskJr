import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { AppState } from "../../store/reducers";
import { login } from "../../store/actions/userActions";
import Input from "../CommonComponents/Input";
import Button from "../CommonComponents/Button";
import Card from "../CommonComponents/Card";
import { LoginForm } from "../../types/user";
import { showSuccessToast } from "../../utils/toastHelper";
import Cookies from 'js-cookie';

const Login: any = (props:any) => {
    window.history.pushState({}, "", "/");

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { data } = useSelector((state: AppState) => state.user);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const formData: LoginForm = { email, password };

        try{
            await dispatch(login(formData));
        }
        catch(error){
            console.error(error);
        }
        setLocalStr();
    };
const setLocalStr = () => {
    const token = Cookies.get("token");
        if (data.name && token) {
            props.setCurrentUser(data);
            showSuccessToast('Successful!');
            navigate("/");
        }
        else{
            props.setCurrentUser(undefined);
        }
}
    useEffect(() => {   
        setLocalStr();
    }, [data.name]);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <Card title="Login">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="Enter your password"
                                />
                            </div>
                            <Button type="submit" text={"Login"} />
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Login;
