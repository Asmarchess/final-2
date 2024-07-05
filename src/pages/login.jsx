import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AuthPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [showRegister, setShowRegister] = useState(false); // State to toggle between login and register

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (showRegister) {
            // Register form submission logic
            if (formData.password !== formData.confirmPassword) {
                setError('Passwords do not match');
                return;
            }

            try {
                const response = await axios.post('http://localhost:3000/user', {
                    name: formData.name,
                    mail: formData.email,
                    password: formData.password
                });

                if (response.status === 200) {
                    alert('Registration successful!');
                    // Redirect or perform any necessary actions after registration
                } else {
                    setError('Registration failed. Please try again later.');
                }
            } catch (error) {
                setError(error.response?.data?.message || 'Failed to register');
            }
        } else {
            // Login form submission logic
            try {
                const response = await axios.get('https://nostalgic-pumped-regnosaurus.glitch.me/acount');

                const user = response.data.find(u => u.name === formData.name && u.password === formData.password);
                if (user) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    alert('Login successful!');
                    // Redirect or perform any necessary actions after login
                } else {
                    setError('Invalid credentials. Please try again.');
                }
            } catch (error) {
                setError('Failed to login. Please try again later.');
            }
        }
    };

    const toggleForm = () => {
        setShowRegister(!showRegister);
        setError(''); // Clear any previous errors when toggling forms
    };

    return (
        <Container className="mt-5">
            <h2 className="mb-4">{showRegister ? 'Register' : 'Login'}</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                {!showRegister && (
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                )}

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>

                {showRegister && (
                    <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                )}

                <Button variant="primary" type="submit">
                    {showRegister ? 'Register' : 'Login'}
                </Button>

                <Button variant="secondary" onClick={toggleForm} className="ms-2">
                    {showRegister ? 'Switch to Login' : 'Switch to Register'}
                </Button>
            </Form>
        </Container>
    );
};

export default AuthPage;
