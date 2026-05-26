import React, { useEffect, useState, useRef } from 'react';
import styles from './ProjectModal.module.css';
import { FiX, FiCheckCircle, FiFileText, FiImage, FiGrid } from 'react-icons/fi';

const ProjectModal = ({ project, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const modalBodyRef = useRef(null);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Handle intersection observer to update active tab on scroll
  useEffect(() => {
    if (!isOpen) return;
    
    const options = {
      root: modalBodyRef.current,
      rootMargin: '0px',
      threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id);
        }
      });
    }, options);

    const sections = document.querySelectorAll('.scroll-section');
    sections.forEach(section => observer.observe(section));

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, [isOpen]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isOpen || !project) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{project.title}</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
            <FiX size={24} />
          </button>
        </div>

        {/* Tabs as Navigation */}
        <div className={styles.tabContainer}>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'overview' ? styles.activeTab : ''}`}
            onClick={() => scrollToSection('overview')}
          >
            <FiCheckCircle /> Overview
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'documents' ? styles.activeTab : ''}`}
            onClick={() => scrollToSection('documents')}
          >
            <FiFileText /> Documents
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'media' ? styles.activeTab : ''}`}
            onClick={() => scrollToSection('media')}
          >
            <FiImage /> Media
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'diagrams' ? styles.activeTab : ''}`}
            onClick={() => scrollToSection('diagrams')}
          >
            <FiGrid /> Architecture
          </button>
        </div>

        {/* Content Area - All sections loaded and scrollable */}
        <div className={styles.modalBody} ref={modalBodyRef}>
          
          <div id="overview" className={`scroll-section ${styles.scrollSection}`}>
            <h3>Problem Statement</h3>
            <p className={styles.textBody}>{project.details.problemStatement}</p>
            
            <h3 style={{ marginTop: '2rem' }}>Description</h3>
            <p className={styles.textBody}>{project.description}</p>
          </div>

          <div className={styles.sectionDivider}></div>

          <div id="documents" className={`scroll-section ${styles.scrollSection}`}>
            <h3>Project Documents</h3>
            <p className={styles.textBody} style={{marginBottom: '1.5rem'}}>
              Access full product requirements, research papers, or technical specifications.
            </p>
            <div className={styles.docGrid}>
              {project.details.documents?.map((doc, idx) => (
                <a key={idx} href={doc.url} target="_blank" rel="noreferrer" className={styles.docLinkCard}>
                  <FiFileText className={styles.docIcon} />
                  <span className={styles.docTitle}>{doc.title}</span>
                  <span className={styles.docExternalIcon}>↗</span>
                </a>
              ))}
            </div>
          </div>

          <div className={styles.sectionDivider}></div>

          <div id="media" className={`scroll-section ${styles.scrollSection}`}>
            <h3>Screenshots & Videos</h3>
            <div className={styles.mediaGrid}>
              {project.details.media?.map((item, idx) => (
                <div key={idx} className={styles.mediaItem}>
                  <img src={item.url || item} alt={item.title || `Media ${idx}`} />
                  {item.title && <p style={{textAlign: 'center', marginTop: '0.8rem', color: 'var(--text-secondary)', fontSize: '0.9rem'}}>{item.title}</p>}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.sectionDivider}></div>

          <div id="diagrams" className={`scroll-section ${styles.scrollSection}`}>
            <h3>Architecture & Diagrams</h3>
            <div className={styles.mediaGrid}>
              {project.details.diagrams?.map((item, idx) => (
                <div key={idx} className={styles.mediaItem}>
                  <img src={item.url || item} alt={item.title || `Diagram ${idx}`} />
                  {item.title && <p style={{textAlign: 'center', marginTop: '0.8rem', color: 'var(--text-secondary)', fontSize: '0.9rem'}}>{item.title}</p>}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProjectModal;
