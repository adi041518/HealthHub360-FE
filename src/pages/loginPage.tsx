import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Login from '../components/login';
function LoginPage() {
    return (
        <Container
            className="d-flex justify-content-center align-items-center "
        >
            <Card style={{ width: "420px", padding: "20px" }}>
                <h3 className="text-center mb-4">
                    Welcome Back
                </h3>

                <Login />
            </Card>
        </Container>
    );
}

export default LoginPage;
