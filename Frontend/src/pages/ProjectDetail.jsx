import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../auth';
import Navbar from '../components/Navbar';
import '../styles/ProjectDetail.css';
const BASE_URL = import.meta.env.VITE_API_URL;

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchSingle = async () => {
      const res = await axios.get(`${BASE_URL}/api/projects`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      const matched = res.data.fuel_stations.find((p) => String(p.id) === id);
      setProject(matched);
    };
    fetchSingle();
  }, [id]);

  if (!project) return <p className="loading">Loading...</p>;

  return (
    <div>
        <Navbar />
        <div className="detail-page">
      
      <div className="detail-card">
        <h2>{project.station_name}</h2>
        <p><strong>City:</strong> {project.city}</p>
        <p><strong>State:</strong> {project.state}</p>
        <p><strong>Fuel Type:</strong> {project.fuel_type_code}</p>
        <p><strong>Address:</strong> {project.street_address}</p>
      </div>
    </div>
    </div>
    
  );
};

export default ProjectDetail;
