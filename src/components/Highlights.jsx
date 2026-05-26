import React, { useState } from 'react';
import { useDev } from '../context/DevContext';
import styles from './Highlights.module.css';
import { FiTrendingUp, FiPlus, FiTrash2 } from 'react-icons/fi';
import HighlightFormModal from './HighlightFormModal';

const Highlights = () => {
  const { highlights, isDevMode, deleteHighlight, addHighlight } = useDev();
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <section id="updates" className="section-container">
      <div className={styles.header}>
        <FiTrendingUp className={styles.headerIcon} />
        <h2 className="gradient-text" style={{ fontSize: '2.5rem', margin: 0 }}>Latest Updates</h2>
        {isDevMode && (
          <button className={`btn`} style={{marginLeft: 'auto', background: 'rgba(108,99,255,0.2)', color: 'var(--accent-primary)', border: '1px dashed var(--accent-primary)'}} onClick={() => setIsFormOpen(true)}>
            <FiPlus /> Add Update
          </button>
        )}
      </div>
      <p className={styles.subtitle}>Recent milestones, releases, and achievements.</p>

      <div className={styles.timeline}>
        {highlights.map((item, index) => (
          <div key={item.id} className={styles.timelineItem}>
            
            {/* Timeline Line & Dot */}
            <div className={styles.timelineLine}>
              <div className={styles.timelineDot}></div>
            </div>

            {/* Content Card */}
            <div className={`glass-card ${styles.contentCard}`}>
              
              {isDevMode && (
                <button 
                  className="btn"
                  style={{position: 'absolute', top: '10px', right: '10px', background: 'rgba(255, 50, 50, 0.2)', color: '#ff4d4d', border: '1px solid rgba(255, 50, 50, 0.4)', padding: '0.4rem', borderRadius: '50%'}}
                  onClick={() => {
                    if(window.confirm("Delete this update?")) deleteHighlight(item.id);
                  }}
                  title="Delete Update"
                >
                  <FiTrash2 />
                </button>
              )}

              <div className={styles.dateBadge}>{item.date}</div>
              <h3 className={styles.itemTitle}>{item.title}</h3>
              <p className={styles.itemDesc}>{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {isFormOpen && (
        <HighlightFormModal 
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSave={addHighlight}
        />
      )}
    </section>
  );
};

export default Highlights;
