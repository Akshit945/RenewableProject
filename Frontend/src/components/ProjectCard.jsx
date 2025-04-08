import { useNavigate } from 'react-router-dom';
import '../styles/ProjectCard.css';

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  return (
    <div className="project-card" onClick={() => navigate(`/project/${project.id}`)}>
      <h3>{project.station_name}</h3>
      <p>Location: {project.city}, {project.state}</p>
      <p>Fuel Type: {project.fuel_type_code}</p>
    </div>
  );
};

export default ProjectCard;
