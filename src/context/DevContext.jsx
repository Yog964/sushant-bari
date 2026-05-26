import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  projects as initialProjects,
  highlights as initialHighlights,
  personalInfo as initialPersonalInfo,
  achievements as initialAchievements,
  certifications as initialCertifications
} from '../data';

const DevContext = createContext();

export const useDev = () => useContext(DevContext);

export const DevProvider = ({ children }) => {
  const [isDevMode, setIsDevMode] = useState(false);
  
  // Data States
  const [projects, setProjects] = useState(initialProjects);
  const [highlights, setHighlights] = useState(initialHighlights);
  const [personalInfo, setPersonalInfo] = useState(initialPersonalInfo);
  const [achievements, setAchievements] = useState(initialAchievements);
  const [certifications, setCertifications] = useState(initialCertifications || []);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const savedProjects = localStorage.getItem('dev_projects');
      const savedHighlights = localStorage.getItem('dev_highlights');
      const savedPersonalInfo = localStorage.getItem('dev_personalInfo');
      const savedAchievements = localStorage.getItem('dev_achievements');
      const savedCertifications = localStorage.getItem('dev_certifications');

      if (savedProjects) setProjects(JSON.parse(savedProjects));
      if (savedHighlights) setHighlights(JSON.parse(savedHighlights));
      if (savedPersonalInfo) setPersonalInfo(JSON.parse(savedPersonalInfo));
      if (savedAchievements) setAchievements(JSON.parse(savedAchievements));
      if (savedCertifications) setCertifications(JSON.parse(savedCertifications));
    } catch (e) {
      console.error("Failed to parse local storage data:", e);
      // Fallback to initial data is handled because state is already initialized
    }
  }, []);

  // Save to Local Storage whenever data changes
  useEffect(() => {
    localStorage.setItem('dev_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('dev_highlights', JSON.stringify(highlights));
  }, [highlights]);

  useEffect(() => {
    localStorage.setItem('dev_personalInfo', JSON.stringify(personalInfo));
  }, [personalInfo]);

  useEffect(() => {
    localStorage.setItem('dev_achievements', JSON.stringify(achievements));
  }, [achievements]);

  useEffect(() => {
    localStorage.setItem('dev_certifications', JSON.stringify(certifications));
  }, [certifications]);

  // Actions
  const toggleDevMode = (password) => {
    if (password === '1234') {
      setIsDevMode(true);
      return true;
    }
    return false;
  };

  const logoutDevMode = () => {
    setIsDevMode(false);
  };

  // Generic updaters
  const addProject = (project) => {
    setProjects(prev => [...prev, { ...project, id: Date.now() }]);
  };

  const updateProject = (updatedProject) => {
    setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
  };

  const deleteProject = (id) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const addHighlight = (highlight) => {
    setHighlights(prev => [{ ...highlight, id: Date.now() }, ...prev]);
  };

  const deleteHighlight = (id) => {
    setHighlights(prev => prev.filter(h => h.id !== id));
  };

  const addAchievement = (achievement) => {
    setAchievements(prev => [...prev, { ...achievement, id: Date.now() }]);
  };

  const updateAchievement = (updatedAchievement) => {
    setAchievements(prev => prev.map(item => item.id === updatedAchievement.id ? updatedAchievement : item));
  };

  const deleteAchievement = (id) => {
    setAchievements(prev => prev.filter(item => item.id !== id));
  };

  const addCertification = (certification) => {
    setCertifications(prev => [...prev, { ...certification, id: Date.now() }]);
  };

  const updateCertification = (updatedCertification) => {
    setCertifications(prev => prev.map(item => item.id === updatedCertification.id ? updatedCertification : item));
  };

  const deleteCertification = (id) => {
    setCertifications(prev => prev.filter(item => item.id !== id));
  };

  const generateExportData = () => {
    return `
export const personalInfo = ${JSON.stringify(personalInfo, null, 2)};

export const highlights = ${JSON.stringify(highlights, null, 2)};

export const skills = [
  { category: "Languages", items: ["C++", "Python", "JavaScript", "TypeScript", "SQL", "Dart"] },
  { category: "Frameworks & Libraries", items: ["React.js", "Node.js", "Express.js", "FastAPI", "Flask", "Pandas", "OpenCV", "MediaPipe", "SQLAlchemy", "React-Leaflet", "Recharts", "Framer Motion", "Flutter"] },
  { category: "Web Technologies", items: ["HTML", "CSS"] },
  { category: "Databases", items: ["MySQL", "MongoDB", "PostgreSQL", "Supabase"] },
  { category: "Tools", items: ["GitHub", "Postman"] }
];

export const projects = ${JSON.stringify(projects, null, 2)};

export const achievements = ${JSON.stringify(achievements, null, 2)};

export const certifications = ${JSON.stringify(certifications, null, 2)};
    `;
  };

  return (
    <DevContext.Provider value={{
      isDevMode, toggleDevMode, logoutDevMode,
      projects, addProject, updateProject, deleteProject,
      highlights, addHighlight, deleteHighlight,
      personalInfo, setPersonalInfo,
      achievements, setAchievements, addAchievement, updateAchievement, deleteAchievement,
      certifications, setCertifications, addCertification, updateCertification, deleteCertification,
      generateExportData
    }}>
      {children}
    </DevContext.Provider>
  );
};
