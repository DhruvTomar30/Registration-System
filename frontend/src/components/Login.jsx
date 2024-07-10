// // Login.jsx
import React, { useState, useContext } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      const { token, user } = response.data;
      login(token, user); // Update authentication state
      navigate('/dashboard', { replace: true });
    } catch (error) {
      setError(error.response.data.message || 'An error occurred');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center login-container">
      <Row className="w-100 justify-content-center">
        <Col md={4}>
          <Card className="login-card">
            <Card.Header className="text-center login-header m-2">
              <h2>Sign In</h2>
            </Card.Header>
            <Card.Body>
              <div className="text-center">
                <img src="src/assets/avatar.webp" alt="Avatar" className="avatar-img" />
              </div>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="sr-only">Email address</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fas fa-user"></i>
                    </span>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label className="sr-only">Password</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fas fa-lock"></i>
                    </span>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </Form.Group>
                {error && <div className="text-danger mb-2">{error}</div>}
                <Button variant="success mt-2 w-100  btn" type="submit" block>
                  LOGIN
                </Button>
              </Form>
              <div className="mt-3 text-center">
                <a href="/register">Create an account</a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

