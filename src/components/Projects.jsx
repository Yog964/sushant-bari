import React, { useState } from 'react';
import {
  FiActivity,
  FiCpu,
  FiDatabase,
  FiExternalLink,
  FiFileText,
  FiGithub,
  FiGrid,
  FiLayers,
  FiPlus,
  FiServer,
  FiSmartphone,
  FiTrash2,
  FiWifi,
  FiEdit
} from 'react-icons/fi';
import ProjectModal from './ProjectModal';
import ProjectFormModal from './ProjectFormModal';
import styles from './Projects.module.css';
import { useDev } from '../context/DevContext';

const Projects = () => {
  const { projects, isDevMode, deleteProject, addProject, updateProject } = useDev();
  const [selectedProject, setSelectedProject] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const getCategoryColor = (category = '') => {
    const palette = ['#6c63ff', '#00d4aa', '#f59e0b', '#ef4444', '#0ea5e9', '#a855f7', '#22c55e'];
    const hash = category.split('').reduce((total, char) => total + char.charCodeAt(0), 0);
    return palette[hash % palette.length];
  };

  const getCategoryIcon = (category = '') => {
    const normalized = category.toLowerCase();

    if (normalized.includes('ai') || normalized.includes('ml')) return <FiCpu />;
    if (normalized.includes('mobile') || normalized.includes('app')) return <FiSmartphone />;
    if (normalized.includes('database') || normalized.includes('data')) return <FiDatabase />;
    if (normalized.includes('network')) return <FiWifi />;
    if (normalized.includes('iot') || normalized.includes('internet')) return <FiActivity />;
    if (normalized.includes('operating') || normalized.includes('system')) return <FiServer />;
    if (normalized.includes('software')) return <FiLayers />;
    return <FiGrid />;
  };

  const openModal = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto'; // Restore background scrolling
  };

  const handleOpenAddForm = () => {
    setEditingProject(null);
    setIsFormOpen(true);
  };

  const handleSaveProject = (projectData) => {
    if (editingProject) {
      updateProject(projectData);
    } else {
      addProject(projectData);
    }
    setIsFormOpen(false);
    setEditingProject(null);
  };

  return (
    <section id="projects" className="section-container">
      <div className={styles.headerRow}>
        <h2 className="gradient-text" style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '3rem' }}>Featured Projects</h2>
        {isDevMode && (
          <button className={`btn ${styles.addBtn}`} onClick={handleOpenAddForm}>
            <FiPlus /> Add Project
          </button>
        )}
      </div>
      
      <div className={styles.projectsGrid}>
        {projects.map(project => (
          <div
            key={project.id}
            className={`glass-card ${styles.projectCard}`}
            style={{ '--category-color': getCategoryColor(project.category) }}
          >
            {/* Project Image */}
            <div className={styles.projectImageWrapper}>
              <img src={project.image} alt={project.title} className={styles.projectImage} />
              {isDevMode && (
                <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '0.5rem', zIndex: 10 }}>
                  <button 
                    className={styles.editBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingProject(project);
                      setIsFormOpen(true);
                    }}
                    title="Edit Project"
                  >
                    <FiEdit />
                  </button>
                  <button 
                    className={styles.deleteBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      if(window.confirm("Are you sure you want to delete this project?")) {
                        deleteProject(project.id);
                      }
                    }}
                    title="Delete Project"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              )}
            </div>

            <div className={styles.projectContent}>
              <div className={styles.projectCategoryBadge}>
                {getCategoryIcon(project.category)}
                <span>{project.category}</span>
              </div>

              <h3 className={styles.projectTitle}>{project.title}</h3>
              
              <div className={styles.techStack}>
                {project.techStack.map((tech, idx) => (
                  <span key={idx} className={styles.techTag}>{tech}</span>
                ))}
              </div>
              
              <div className={styles.projectLinks}>
                <a href={project.links.github} target="_blank" rel="noreferrer" className={`${styles.linkBtn} ${styles.outlineBtn}`}>
                  <FiGithub /> Code
                </a>
                
                {project.links.live && (
                  <a href={project.links.live} target="_blank" rel="noreferrer" className={`${styles.linkBtn} ${styles.primaryBtn}`}>
                    <FiExternalLink /> Live
                  </a>
                )}
                
                {project.links.hasDetails && (
                  <button onClick={() => openModal(project)} className={`${styles.linkBtn} ${styles.secondaryBtn}`}>
                    <FiFileText /> Details
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          isOpen={!!selectedProject} 
          onClose={closeModal} 
        />
      )}

      {isFormOpen && (
        <ProjectFormModal 
          initialData={editingProject}
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setEditingProject(null);
          }}
          onSave={handleSaveProject}
        />
      )}
    </section>
  );
};

export default Projects;
