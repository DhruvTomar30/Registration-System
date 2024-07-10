// Register.jsx
import React, { useState, useContext } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Register.css';

const Register = () => {
  const { register } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/register', { name, dob, email, password });
      const { token, user } = response.data;
      register(token, user); // Update authentication state
      navigate('/login', { replace: true });
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
      } else {
        console.error('Error:', error.message);
      }
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center login-container">
      <Row className="w-100 justify-content-center">
        <Col md={4}>
          <Card className="login-card">
            <Card.Header className="text-center login-header">
              <h2>Register</h2>
            </Card.Header>
            <Card.Body>
              <div className="text-center m-2">
                <img src="src/assets/avatar.webp" alt="Avatar" className="avatar-img" />
              </div>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName">
                  <Form.Label className="sr-only">Name</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fas fa-user"></i>
                    </span>
                    <Form.Control
                      type="text"
                      placeholder="Enter name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </Form.Group>
                <Form.Group controlId="formDob">
                  <Form.Label className="sr-only">Date of Birth</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fas fa-calendar"></i>
                    </span>
                    <Form.Control
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      required
                    />
                  </div>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="sr-only">Email address</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fas fa-envelope"></i>
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
                <Button variant="success" className='w-100 m-2' type="submit" block>
                  Sign Up
                </Button>
              </Form>
              <div className="mt-3 text-center">
                <a href="/login">Already have an account? Sign in</a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;

