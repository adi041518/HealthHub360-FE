import { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import { loginApi } from '../axios/api/authApi';
type LoginType = "email" | "phone" | "id";

function Login() {


    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        let payload: any = { password };

        if (loginType === "email") payload.email = email;
        if (loginType === "phone") payload.phone = phone;
        if (loginType === "id") payload.userId = userId;

        try {

            const response = await loginApi(payload);
            console.log("response: ", response)
            if (response.status === 200) {

                localStorage.setItem("token", response.data.data.token);

                navigate("/reset-password");

            }

        } catch (error: any) {

            if (error.response?.status === 401) {
                alert("Invalid credentials");
            }

            else if (error.response?.status === 403) {
                navigate("/reset-password");
            }

            else {
                alert("Server error");
            }
        }
    };

    const [loginType, setLoginType] = useState<LoginType>("email");

    return (

        <div className="d-flex justify-content-center align-items-center">

            <Form style={{ width: "380px" }} onSubmit={handleLogin}>

                <h3 className="text-center mb-4">Login</h3>

                <div className="d-flex justify-content-around mb-3">

                    <Form.Check
                        id='email-radio'
                        type="radio"
                        label="Email"
                        name="loginType"
                        checked={loginType === "email"}
                        onChange={() => setLoginType("email")}
                    />

                    <Form.Check
                        id='phone-radio'
                        type="radio"
                        label="PhoneNo"
                        name="loginType"
                        checked={loginType === "phone"}
                        onChange={() => setLoginType("phone")}
                    />

                    <Form.Check
                        id='id-radio'
                        type="radio"
                        label="UserID"
                        name="loginType"
                        checked={loginType === "id"}
                        onChange={() => setLoginType("id")}
                    />

                </div>


                {loginType === "email" && (
                    <FloatingLabel
                        controlId="floatingEmail"
                        label="Email address"
                        className="mb-3"
                    >
                        <Form.Control
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FloatingLabel>
                )}

                {loginType === "phone" && (
                    <FloatingLabel
                        controlId="floatingPhone"
                        label="Phone Number"
                        className="mb-3"
                    >
                        <Form.Control
                            type="tel"
                            placeholder="9876543210"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </FloatingLabel>
                )}

                {loginType === "id" && (
                    <FloatingLabel
                        controlId="floatingId"
                        label="User ID"
                        className="mb-3"
                    >
                        <Form.Control
                            type="text"
                            placeholder="Enter user id"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        />
                    </FloatingLabel>
                )}

                <FloatingLabel
                    controlId="floatingPassword"
                    label="Password"
                    className="mb-3"
                >
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FloatingLabel>

                <div className="d-flex justify-content-between align-items-center">

                    <Button variant="primary" type='submit'>
                        Login
                    </Button>

                    <Link to="/forgot-password">
                        Forgot password?
                    </Link>

                </div>

            </Form>

        </div>
    );
}

export default Login;
