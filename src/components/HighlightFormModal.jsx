import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';
import styles from './ProjectFormModal.module.css'; // Reuse styles from project modal

const HighlightFormModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    description: ''
  });

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
      <div className={styles.modalContent} onClick={e => e.stopPropagation()} style={{maxWidth: '500px'}}>
        <button className={styles.closeBtn} onClick={onClose}><FiX size={24} /></button>
        
        <h2 className="gradient-text">Add New Highlight</h2>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formSection}>
            <div className={styles.inputGroup}>
              <label>Title</label>
              <input required type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Shipped Version 1.0" />
            </div>
            
            <div className={styles.inputGroup}>
              <label>Date</label>
              <input required type="text" name="date" value={formData.date} onChange={handleChange} placeholder="e.g. February 2026" />
            </div>

            <div className={styles.inputGroup}>
              <label>Description</label>
              <textarea required name="description" rows="4" value={formData.description} onChange={handleChange}></textarea>
            </div>
          </div>

          <div className={styles.actions}>
            <button type="button" onClick={onClose} className="btn">Cancel</button>
            <button type="submit" className="btn btn-primary">Save Highlight</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HighlightFormModal;
