import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../auth';
import '../styles/Login.css';
import Navbar from '../components/Navbar';
const BASE_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
console.log(`${BASE_URL}/api/auth/auth/login`);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/auth/login`, { email, password });
      setToken(res.data.token);
      navigate('/projects');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="form-container">
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <p className="text-link" style={{ marginTop: '12px' }}>
  Don't have an account? <a href="/register">Register</a>
</p>

      <form onSubmit={handleSubmit} className="login-form">
  <h2>Login</h2>
  <p>If you dont want to register:</p>
  <p>Email:testing@test.com</p>
  <p>Password:test123</p>
  <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
  <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
  <button type="submit">Login</button>
</form>
    </div>
    </div>
  );
};

export default Login;
