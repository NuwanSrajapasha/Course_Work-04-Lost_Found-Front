import { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

function Register() {
  const [userData, setUserData] = useState({
    userName: '',
    userEmail: '',
    userPassword: '',
    userPhone: '',
    userRole: '' 
  });

 const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8080/lost_found/api/v1/auths/register',
        userData
      );
      alert('Registration successful!');
      console.log(response.data);
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please check the console for details.');
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "80vh",
      }}
    >
      <h1 style={{ marginBottom: "50px" }}>Welcome to Lost Found Hub</h1>
      <h3 style={{ marginBottom: "30px" }}>Register</h3>

      <Form
        onSubmit={handleSubmit}
        style={{ maxWidth: "320px", width: "100%" }}
      >
        <Form.Label>User Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Name"
          name="userName"
          value={userData.userName}
          onChange={handleChange}
          required
        />

        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="name@example.com"
            name="userEmail"
            value={userData.userEmail}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            placeholder="+94 77XXXXXXX"
            name="userPhone"
            value={userData.userPhone}
            onChange={handleChange}
            required
          />
          <Form.Text muted>Use international format like +94...</Form.Text>
        </Form.Group>

        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="userPassword"
          value={userData.userPassword}
          onChange={handleChange}
          required
        />
        <Form.Text muted>
          Your password must be 8–20 characters long, contain letters and
          numbers.
        </Form.Text>

        {/*  Role Dropdown */}
        <Form.Group className="mb-3" controlId="roleSelect">
          <Form.Label>Select Role</Form.Label>
          <Form.Select
            name="userRole"
            value={userData.userRole}
            onChange={handleChange}
            required
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
            <option value="STAFF">STAFF</option>
          </Form.Select>
        </Form.Group>

        <div style={{ marginTop: "50px", textAlign: "center" }}>
          <Button type="submit">Register</Button>
        </div>
      </Form>
    </div>
  );
}

export default Register;
