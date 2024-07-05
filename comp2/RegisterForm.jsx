import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const userData = {
      name: name,
      email: email,
      password: password
    };

    axios.post('http://localhost:8000/users', userData)
      .then(response => {
        console.log('Success:', response.data);
        setSuccessMessage('Registration completed successfully!');
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Registration failed, please try again.');
      });
  };

  return (
    <div className="register-form">
      <h2>Create a new account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input 
            type="text" 
            placeholder="Enter Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            required 
          />
        </div>
        <div>
          <input 
            type="email" 
            placeholder="Enter Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>
        <div>
          <input 
            type="password" 
            placeholder="Enter Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>
        <div>
          <input 
            type="password" 
            placeholder="Confirm Password" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required 
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default RegisterForm;

