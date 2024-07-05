import React, { useState } from 'react';
import { GoogleLoginButton, FacebookLoginButton, TwitterLoginButton } from "react-social-login-buttons";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log({ email, password, rememberMe });
  };

  return (
    <div className="login-form">
      <h2>Login to your account</h2>
      <form onSubmit={handleSubmit}>
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
        <div className="form-options">
          <label>
            Remember me 
            <input 
              type="checkbox" 
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            /> 
          </label>
          <a href="#forgot-password">Forgot Password</a>
        </div>
        <button type="submit">Login</button>
      </form>
      <div className="social-login">
        <FacebookLoginButton onClick={() => alert("Facebook")}/>
        <TwitterLoginButton onClick={() => alert("Twitter")}/>
        <GoogleLoginButton onClick={() => alert("Google")}/>
      </div>
    </div>
  );
};

export default LoginForm;
