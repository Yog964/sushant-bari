import { useState } from 'react';
import styles from './Achievements.module.css';
import AchievementFormModal from './AchievementFormModal';
import { useDev } from '../context/DevContext';
import {
  FiEdit,
  FiExternalLink,
  FiFileText,
  FiPlus,
  FiTrash2
} from 'react-icons/fi';

const Achievements = () => {
  const {
    achievements,
    certifications,
    isDevMode,
    addAchievement,
    updateAchievement,
    deleteAchievement,
    addCertification,
    updateCertification,
    deleteCertification
  } = useDev();
  const [formMode, setFormMode] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [formDefaults, setFormDefaults] = useState(null);

  const publications = achievements.filter(item => item.type?.toLowerCase() === 'publication');
  const otherAchievements = achievements.filter(item => item.type?.toLowerCase() !== 'publication');

  const openForm = (mode, item = null, defaults = null) => {
    setFormMode(mode);
    setEditingItem(item);
    setFormDefaults(defaults);
  };

  const closeForm = () => {
    setFormMode(null);
    setEditingItem(null);
    setFormDefaults(null);
  };

  const saveItem = (data) => {
    if (formMode === 'certification') {
      editingItem ? updateCertification(data) : addCertification(data);
      return;
    }

    editingItem ? updateAchievement(data) : addAchievement(data);
  };

  const renderDevActions = (mode, item, onDelete) => (
    isDevMode && (
      <div className={styles.devActions}>
        <button type="button" onClick={() => openForm(mode, item)} title="Edit">
          <FiEdit />
        </button>
        <button
          type="button"
          onClick={() => {
            if (window.confirm('Delete this item?')) onDelete(item.id);
          }}
          title="Delete"
        >
          <FiTrash2 />
        </button>
      </div>
    )
  );

  return (
    <section className="section-container" id="achievements">
      <h2 className="gradient-text" style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '1rem' }}>
        Publications & Achievements
      </h2>
      <p className={styles.subtitle}>Research, hackathon wins, and credentials</p>

      <div className={styles.sectionHeader}>
        <h3>Research Papers</h3>
        {isDevMode && (
          <button className="btn" onClick={() => openForm('achievement', null, { type: 'Publication', title: '', paperLink: '' })}>
            <FiPlus /> Add Paper
          </button>
        )}
      </div>

      <div className={styles.grid}>
        {publications.map((item, idx) => (
          <div key={item.id} className={`glass-card ${styles.card}`} style={{ animationDelay: `${idx * 0.15}s` }}>
            {renderDevActions('achievement', item, deleteAchievement)}
            <div className={styles.iconBadge}>
              <FiFileText size={24} />
            </div>
            <div className={styles.cardContent}>
              <span className={styles.typeBadge}>{item.type}</span>
              <h3 className={styles.title}>{item.title}</h3>
              {item.date && <p className={styles.meta}>{item.date}</p>}
            </div>
            {item.paperLink && (
              <div className={styles.cardFooter}>
                <a href={item.paperLink} target="_blank" rel="noreferrer" className={styles.viewLink}>
                  View Paper <FiExternalLink size={14} />
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={styles.sectionHeader}>
        <h3>Hackathon Achievements</h3>
        {isDevMode && (
          <button className="btn" onClick={() => openForm('achievement', null, { type: 'Hackathon', title: '', details: '', image: '', paperLink: '' })}>
            <FiPlus /> Add Achievement
          </button>
        )}
      </div>

      <div className={styles.mediaGrid}>
        {otherAchievements.map(item => (
          <div key={item.id} className={`glass-card ${styles.mediaCard}`}>
            {renderDevActions('achievement', item, deleteAchievement)}
            {item.image && <img src={item.image} alt={item.title} className={styles.cardImage} />}
            <div className={styles.mediaContent}>
              <span className={styles.typeBadge}>{item.type || 'Achievement'}</span>
              <h3 className={styles.title}>{item.title}</h3>
              {item.date && <p className={styles.meta}>{item.date}</p>}
              {item.details && <p className={styles.description}>{item.details}</p>}
              {item.paperLink && (
                <a href={item.paperLink} target="_blank" rel="noreferrer" className={styles.viewLink}>
                  View Details <FiExternalLink size={14} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className={`${styles.sectionHeader} ${styles.certificatesHeader}`} id="certifications">
        <h3 className="gradient-text">Certifications</h3>
        {isDevMode && (
          <button className="btn" onClick={() => openForm('certification')}>
            <FiPlus /> Add Certificate
          </button>
        )}
      </div>

      <div className={styles.mediaGrid}>
        {certifications.map(item => (
          <div key={item.id} className={`glass-card ${styles.mediaCard}`}>
            {renderDevActions('certification', item, deleteCertification)}
            <img src={item.image} alt={item.name} className={styles.cardImage} />
            <div className={styles.mediaContent}>
              <span className={styles.typeBadge}>Certificate</span>
              <h3 className={styles.title}>{item.name}</h3>
              {(item.issuer || item.date) && (
                <p className={styles.meta}>{[item.issuer, item.date].filter(Boolean).join(' | ')}</p>
              )}
              <a href={item.link} target="_blank" rel="noreferrer" className={styles.viewLink}>
                View Certificate <FiExternalLink size={14} />
              </a>
            </div>
          </div>
        ))}
      </div>

      <AchievementFormModal
        isOpen={!!formMode}
        mode={formMode}
        initialData={editingItem || formDefaults}
        isEditing={!!editingItem}
        onClose={closeForm}
        onSave={saveItem}
      />
    </section>
  );
};

export default Achievements;
