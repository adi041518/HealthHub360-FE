import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { forgotPasswordApi } from '../axios/api/authApi';
type ForgotType = "email" | "phone";
function Forgot() {



    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const navigate = useNavigate();

    const handleForgot = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let payload: any = {};

        if (forgotType === "email") payload.email = email;
        if (forgotType === "phone") payload.phone = phone;

        try {

            const response = await forgotPasswordApi(payload);

            if (response.status === 200) {

                localStorage.setItem("token", response.data.data.token);

                navigate("/login");
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
    const [forgotType, setForgetType] = useState<ForgotType>("email");
    return (
        <>
            <Form onSubmit={handleForgot}>
                <div className="d-flex justify-content-around mb-3">

                    <Form.Check
                        id="email-radio"
                        type="radio"
                        label="Email"
                        name="loginType"
                        checked={forgotType === "email"}
                        onChange={() => setForgetType("email")}
                    />

                    <Form.Check
                        id="phone-radio"
                        type="radio"
                        label="PhoneNo"
                        name="loginType"
                        checked={forgotType === "phone"}
                        onChange={() => setForgetType("phone")}
                    />

                </div>


                {forgotType === "email" && (
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


                {forgotType === "phone" && (
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

                <div className="d-flex justify-content-between algin-items-center">
                        <Button variant="primary">Submit</Button>
                </div>
            </Form>
        </>
    );
}

export default Forgot;