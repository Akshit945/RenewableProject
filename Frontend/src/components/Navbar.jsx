import { removeToken, getToken } from '../auth';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const token = getToken();

  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h1 onClick={() => navigate('/projects')} className="logo">⚡ Energy Projects</h1>
      {token && (
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      )}
      {!token && (
        <button onClick={handleLogout} className="logout-btn">
          Login
        </button>
      )}
    </nav>
  );
};

export default Navbar;
