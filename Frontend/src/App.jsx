import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Projects from './pages/Projects';
import ProtectedRoute from './ProtectedRoute';
import ProjectDetail from './pages/ProjectDetail';

function App() {
  return (
    <BrowserRouter>
    
    <Routes>
  <Route path="*" element={<div>Page Not found</div>} />
  <Route path="/register" element={<Register />} />
  <Route path="/" element={<Register />} />
  <Route path="/login" element={<Login />} />
  <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
  <Route path="/project/:id" element={<ProtectedRoute><ProjectDetail /></ProtectedRoute>} />
</Routes>
    </BrowserRouter>
  );
}

export default App;
