import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import "../assets/css/login.css";

axios.defaults.baseURL = 'http://localhost:3001';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // Handle login
        const response = await axios.post('/api/users/login', formData);
        console.log('Logged in:', response.data);

        // Store token or user data if needed
        localStorage.setItem('token', response.data.token);

        // Redirect to the dashboard
        navigate('/dashboard'); // Adjust the path as needed
      } else {
        // Handle register
        const response = await axios.post('/api/users/register', formData);
        console.log('Registered:', response.data);

        // Redirect to the login page after successful registration
        navigate('/'); // Adjust the path as needed
      }
    } catch (err) {
      setError(err.response ? err.response.data.error : 'An error occurred');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleFormSubmit}>
          {!isLogin && (
            <div className="input-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required={!isLogin}
              />
            </div>
          )}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
        </form>
        <div className="toggle-form">
          <p>
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <span onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Register' : 'Login'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
