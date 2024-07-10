import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Modal } from 'react-bootstrap';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      axios.get('http://localhost:5000/api/users')
        .then(response => {
          setUsers(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    window.addEventListener('unload', () => {
      logout(); // Call the logout function from AuthContext
      navigate('/login', { replace: true }); // Redirect to login page
    });
    return () => {
      window.removeEventListener('unload', () => {
        logout(); // Call the logout function from AuthContext
        navigate('/login', { replace: true }); // Redirect to login page
      });
    };
  }, []);

  const handleBeforeUnload = (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  const handleModalCancel = () => {
    setShowModal(false);
  };

  const handleModalConfirm = () => {
    logout(); // Call the logout function from AuthContext
    navigate('/login', { replace: true }); // Redirect to login page
  };

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
    navigate('/login', { replace: true }); // Redirect to login page
  };

  return (
    <Container fluid>
      <Row>
        <Col xs={12} md={12} lg={12}>
          <h1>Dashboard</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Serial No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Date of Birth</th>
                <th>Password</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.dob}</td>
                  <td>{user.password}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Button variant="success" onClick={handleLogout}>
        Logout
      </Button>
      {showModal && (
        <Modal show={showModal} onHide={handleModalCancel}>
          <Modal.Header>Confirm Leave</Modal.Header>
          <Modal.Body>Are you sure you want to leave the page?</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleModalCancel}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleModalConfirm}>
              Leave
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default Dashboard;