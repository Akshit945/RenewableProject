import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/Login.css';
const BASE_URL = import.meta.env.VITE_API_URL;

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/api/auth/register`, {
        name,
        email,
        password
      });
      alert('Registered successfully! You can now log in.');
      navigate('/login');
    } catch (err) {
      alert('Registration failed. Email might already be in use.');
    }
  };



  return (
    <div>
      <Navbar />
      <div className="form-container">
        <form onSubmit={handleRegister} className="login-form">
          <h2>Register</h2> 
          <input
            type="text"
            placeholder="Full Name"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>

        </form>
      </div>
    </div>
  );
};

export default Register;
