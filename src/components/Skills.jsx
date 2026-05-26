import React, { useState } from 'react';
import styles from './Skills.module.css';
import {
  SiCplusplus, SiPython, SiJavascript, SiTypescript, SiDart,
  SiReact, SiNodedotjs, SiExpress, SiFastapi, SiFlask, SiPandas, SiOpencv,
  SiFlutter, SiSqlalchemy, SiFramer,
  SiHtml5,
  SiMysql, SiMongodb, SiPostgresql, SiSupabase,
  SiGithub, SiPostman
} from 'react-icons/si';
import { FiCode, FiLayers, FiGlobe, FiDatabase, FiTool } from 'react-icons/fi';

const skillIconMap = {
  'C++': SiCplusplus,
  'Python': SiPython,
  'JavaScript': SiJavascript,
  'TypeScript': SiTypescript,
  'SQL': null,
  'Dart': SiDart,
  'React.js': SiReact,
  'Node.js': SiNodedotjs,
  'Express.js': SiExpress,
  'FastAPI': SiFastapi,
  'Flask': SiFlask,
  'Pandas': SiPandas,
  'OpenCV': SiOpencv,
  'MediaPipe': null,
  'SQLAlchemy': SiSqlalchemy,
  'React-Leaflet': SiReact,
  'Recharts': SiReact,
  'Framer Motion': SiFramer,
  'Flutter': SiFlutter,
  'HTML': SiHtml5,
  'CSS': null,
  'MySQL': SiMysql,
  'MongoDB': SiMongodb,
  'PostgreSQL': SiPostgresql,
  'Supabase': SiSupabase,
  'GitHub': SiGithub,
  'Postman': SiPostman,
};

const skillColorMap = {
  'C++': '#00599C',
  'Python': '#3776AB',
  'JavaScript': '#F7DF1E',
  'TypeScript': '#3178C6',
  'SQL': '#4479A1',
  'Dart': '#0175C2',
  'React.js': '#61DAFB',
  'Node.js': '#339933',
  'Express.js': 'var(--text-primary)',
  'FastAPI': '#009688',
  'Flask': 'var(--text-primary)',
  'Pandas': '#150458',
  'OpenCV': '#5C3EE8',
  'MediaPipe': '#00A65A',
  'SQLAlchemy': '#D71F00',
  'React-Leaflet': '#199900',
  'Recharts': '#22B5BF',
  'Framer Motion': '#0055FF',
  'Flutter': '#02569B',
  'HTML': '#E34F26',
  'CSS': '#1572B6',
  'MySQL': '#4479A1',
  'MongoDB': '#47A248',
  'PostgreSQL': '#4169E1',
  'Supabase': '#3ECF8E',
  'GitHub': 'var(--text-primary)',
  'Postman': '#FF6C37',
};

const categoryIcons = {
  'Languages': <FiCode />,
  'Frameworks & Libraries': <FiLayers />,
  'Web Technologies': <FiGlobe />,
  'Databases': <FiDatabase />,
  'Tools': <FiTool />,
};

const categoryColors = {
  'Languages': '#6c63ff',
  'Frameworks & Libraries': '#00d4aa',
  'Web Technologies': '#ff6b9d',
  'Databases': '#f59e0b',
  'Tools': '#38bdf8',
};

const skills = [
  { category: 'Languages', items: ['C++', 'Python', 'JavaScript', 'TypeScript', 'SQL', 'Dart'] },
  { category: 'Frameworks & Libraries', items: ['React.js', 'Node.js', 'Express.js', 'FastAPI', 'Flask', 'Pandas', 'OpenCV', 'MediaPipe', 'SQLAlchemy', 'React-Leaflet', 'Recharts', 'Framer Motion', 'Flutter'] },
  { category: 'Web Technologies', items: ['HTML', 'CSS'] },
  { category: 'Databases', items: ['MySQL', 'MongoDB', 'PostgreSQL', 'Supabase'] },
  { category: 'Tools', items: ['GitHub', 'Postman'] },
];

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  return (
    <section className="section-container" id="skills">
      <h2 className="gradient-text" style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '1rem' }}>
        Skills & Expertise
      </h2>
      <p className={styles.subtitle}>Technologies I work with</p>

      <div className={styles.categoryContainer}>
        {skills.map((cat) => {
          const activeColor = categoryColors[cat.category];
          
          return (
            <div key={cat.category} className={styles.categorySection}>
              <h3 className={styles.categoryHeader} style={{ color: activeColor }}>
                <span className={styles.categoryIcon}>{categoryIcons[cat.category]}</span>
                {cat.category}
              </h3>
              
              <div className={styles.skillsGrid}>
                {cat.items.map((skill, idx) => {
                  const IconComponent = skillIconMap[skill];
                  const brandColor = skillColorMap[skill] || activeColor;
                  const isHovered = hoveredSkill === skill;
                  
                  return (
                    <div
                      key={skill}
                      className={`glass-card ${styles.skillCard}`}
                      onMouseEnter={() => setHoveredSkill(skill)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      style={{
                        animationDelay: `${idx * 0.05}s`,
                        borderColor: isHovered ? brandColor : 'var(--glass-border)',
                        boxShadow: isHovered ? `0 0 20px ${brandColor}33, var(--shadow-card)` : 'var(--shadow-card)',
                      }}
                    >
                      <div
                        className={styles.iconWrapper}
                        style={{ background: isHovered ? `${brandColor}22` : `${brandColor}11`, color: brandColor }}
                      >
                        {IconComponent ? <IconComponent size={24} /> : <FiCode size={24} />}
                      </div>
                      <span className={styles.skillName}>{skill}</span>
                      <div className={styles.skillBar}>
                        <div
                          className={styles.skillBarFill}
                          style={{
                            background: `linear-gradient(90deg, ${brandColor}, ${brandColor}88)`,
                            width: isHovered ? '100%' : '0%',
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
