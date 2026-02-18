import { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { resetPasswordApi } from '../axios/api/authApi';
import { useNavigate } from 'react-router-dom';

function Reset() {

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleReset = async () => {

        try {

            setLoading(true);

            const payload = {
                newPassword,
                confirmPassword

            };

            console.log("payload:", payload)
            const response = await resetPasswordApi(payload);
            if (response.status === 200) {

                alert("Password reset successful!");

                localStorage.removeItem("token");
                localStorage.setItem("token", response.data.data.token)
                navigate("/login");
            }

        } catch (error: any) {

            if (error.response?.status === 401) {
                alert("Token expired. Please login again.");
                navigate("/login");
            }
            else {
                alert("Server error");
            }

        } finally {
            setLoading(false);
        }
    };


    return (

        <div className="d-flex justify-content-center align-items-center vh-100">

            <Form style={{ width: "380px" }}>

                <h3 className="mb-4 text-center">Reset Password</h3>

                <FloatingLabel label="New Password" className="mb-3">
                    <Form.Control
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </FloatingLabel>

                <FloatingLabel label="Confirm Password" className="mb-3">
                    <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </FloatingLabel>

                <Button
                    variant="primary"
                    className="w-100"
                    onClick={handleReset}
                    disabled={loading}
                >
                    {loading ? "Resetting..." : "Reset Password"}
                </Button>

            </Form>

        </div>
    );
}

export default Reset;
