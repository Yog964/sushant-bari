import React from 'react';
import { education } from '../data';
import styles from './Education.module.css';
import { FiBookOpen, FiAward } from 'react-icons/fi';

const Education = () => {
  return (
    <section className="section-container" id="education">
      <h2 className="gradient-text" style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '1rem' }}>
        Education
      </h2>
      <p className={styles.subtitle}>My academic journey</p>

      <div className={styles.timeline}>
        <div className={styles.timelineLine} />

        {education.map((edu, idx) => (
          <div key={edu.id} className={`${styles.timelineItem} ${idx % 2 === 0 ? styles.left : styles.right}`}>
            <div className={styles.timelineDot}>
              <FiBookOpen />
            </div>
            <div className={`glass-card ${styles.timelineCard}`}>
              <div className={styles.cardHeader}>
                <h3 className={styles.degree}>{edu.degree}</h3>
                <span className={styles.duration}>{edu.duration}</span>
              </div>
              <p className={styles.institution}>{edu.institution}</p>
              <div className={styles.gpaRow}>
                <FiAward className={styles.gpaIcon} />
                <span className={styles.gpa}>CGPA: {edu.gpa}</span>
              </div>
              {edu.description && (
                <p className={styles.courseWork}>{edu.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
