import { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken, removeToken } from '../auth';
import ProjectCard from '../components/ProjectCard';
import { useNavigate } from 'react-router-dom';
import '../styles/Projects.css';
import Navbar from '../components/Navbar';
const BASE_URL = import.meta.env.VITE_API_URL;

let debounceTimer;

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 20;

const paginatedProjects = filteredProjects.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);


  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/projects`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        setProjects(res.data.fuel_stations || []);
        setFilteredProjects(res.data.fuel_stations || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);
  

  const handleSearch = (text) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const filtered = projects.filter(
        (p) =>
          p.station_name?.toLowerCase().includes(text.toLowerCase()) ||
          p.city?.toLowerCase().includes(text.toLowerCase()) ||
          p.fuel_type_code?.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredProjects(filtered);
    }, 300);
  };

  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };

  return (
    <div><Navbar />
     <div className="projects-container">
     


     <input
       type="text"
       className="search-input"
       placeholder="Search..."
       onChange={(e) => {
         setSearchText(e.target.value);
         handleSearch(e.target.value);
       }}
       value={searchText}
     />
   
     {loading ? (
       <p>Loading projects...</p>
     ) : filteredProjects.length === 0 ? (
       <p>No projects found.</p>
     ) : (
       <div className="project-grid">
     {paginatedProjects.map((p) => (
       <ProjectCard key={p.id} project={p} />
     ))}
   </div>
   
     )}
     <div className="pagination">
     {Array.from({ length: Math.ceil(filteredProjects.length / itemsPerPage) }, (_, i) => (
       <button
         key={i}
         onClick={() => setCurrentPage(i + 1)}
         className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
       >
         {i + 1}
       </button>
     ))}
   </div>
   </div>
    </div>
   
  );
};

export default Projects;
