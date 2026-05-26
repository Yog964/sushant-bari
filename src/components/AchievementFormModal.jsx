import { useState } from 'react';
import { FiX } from 'react-icons/fi';
import styles from './ProjectFormModal.module.css';

const emptyAchievement = {
  title: '',
  type: 'Publication',
  date: '',
  details: '',
  image: '',
  paperLink: ''
};

const emptyCertification = {
  name: '',
  issuer: '',
  date: '',
  image: '',
  link: ''
};

const AchievementFormModal = ({ isOpen, mode, initialData = null, isEditing = false, onClose, onSave }) => {
  const isCertification = mode === 'certification';
  const [formData, setFormData] = useState(initialData || (isCertification ? emptyCertification : emptyAchievement));

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()} style={{ maxWidth: '620px' }}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close form">
          <FiX size={24} />
        </button>

        <h2 className="gradient-text">
          {isEditing ? 'Edit' : 'Add'} {isCertification ? 'Certification' : 'Achievement'}
        </h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formSection}>
            {isCertification ? (
              <>
                <div className={styles.inputGroup}>
                  <label>Certificate Name</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div className={styles.row}>
                  <div className={styles.inputGroup}>
                    <label>Issuer</label>
                    <input type="text" name="issuer" value={formData.issuer || ''} onChange={handleChange} />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Date</label>
                    <input type="text" name="date" value={formData.date || ''} onChange={handleChange} />
                  </div>
                </div>
                <div className={styles.inputGroup}>
                  <label>Certificate Image URL</label>
                  <input required type="text" name="image" value={formData.image} onChange={handleChange} />
                </div>
                <div className={styles.inputGroup}>
                  <label>Certificate Link</label>
                  <input required type="text" name="link" value={formData.link} onChange={handleChange} />
                </div>
              </>
            ) : (
              <>
                <div className={styles.inputGroup}>
                  <label>Title</label>
                  <input required type="text" name="title" value={formData.title} onChange={handleChange} />
                </div>
                <div className={styles.row}>
                  <div className={styles.inputGroup}>
                    <label>Type</label>
                    <input required type="text" name="type" value={formData.type} onChange={handleChange} placeholder="Publication or Hackathon" />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Date</label>
                    <input type="text" name="date" value={formData.date || ''} onChange={handleChange} />
                  </div>
                </div>
                <div className={styles.inputGroup}>
                  <label>Research Paper / Achievement Link</label>
                  <input type="text" name="paperLink" value={formData.paperLink || ''} onChange={handleChange} />
                </div>
                <div className={styles.inputGroup}>
                  <label>Photograph URL</label>
                  <input type="text" name="image" value={formData.image || ''} onChange={handleChange} />
                </div>
                <div className={styles.inputGroup}>
                  <label>Details</label>
                  <textarea name="details" rows="4" value={formData.details || ''} onChange={handleChange}></textarea>
                </div>
              </>
            )}
          </div>

          <div className={styles.actions}>
            <button type="button" onClick={onClose} className="btn">Cancel</button>
            <button type="submit" className="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AchievementFormModal;
