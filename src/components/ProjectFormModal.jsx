import React, { useState } from 'react';
import { FiX, FiPlus, FiTrash2 } from 'react-icons/fi';
import styles from './ProjectFormModal.module.css';

const ProjectFormModal = ({ isOpen, onClose, onSave, initialData = null }) => {
  const [formData, setFormData] = useState(() => {
    if (initialData) {
      return {
        ...initialData,
        details: {
          ...initialData.details,
          documents: initialData.details?.documents || [],
          media: initialData.details?.media || [],
          diagrams: initialData.details?.diagrams || []
        }
      };
    }
    return {
      title: '',
      date: '',
      image: '',
      description: '',
      category: '',
      techStack: '', // Comma separated
      links: { github: '', live: '' },
      details: {
        problemStatement: '',
        documents: [],
        media: [],
        diagrams: []
      }
    };
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLinkChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      links: { ...prev.links, [name]: value }
    }));
  };

  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      details: { ...prev.details, [name]: value }
    }));
  };

  const addDocument = () => {
    setFormData(prev => ({
      ...prev,
      details: {
        ...prev.details,
        documents: [...prev.details.documents, { title: '', url: '' }]
      }
    }));
  };

  const updateDocument = (index, field, value) => {
    const newDocs = [...formData.details.documents];
    newDocs[index][field] = value;
    setFormData(prev => ({
      ...prev,
      details: { ...prev.details, documents: newDocs }
    }));
  };

  const removeDocument = (index) => {
    const newDocs = formData.details.documents.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      details: { ...prev.details, documents: newDocs }
    }));
  };

  const addObjectField = (field) => {
    setFormData(prev => ({
      ...prev,
      details: {
        ...prev.details,
        [field]: [...(prev.details[field] || []), { title: '', url: '' }]
      }
    }));
  };

  const updateObjectField = (field, index, key, value) => {
    const newArr = [...formData.details[field]];
    // If the old data was a string, convert it to an object format on edit
    if (typeof newArr[index] === 'string') {
      newArr[index] = { title: '', url: newArr[index] };
    }
    newArr[index][key] = value;
    setFormData(prev => ({
      ...prev,
      details: { ...prev.details, [field]: newArr }
    }));
  };

  const removeObjectField = (field, index) => {
    const newArr = formData.details[field].filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      details: { ...prev.details, [field]: newArr }
    }));
  };
  const addStringField = (field) => {
    setFormData(prev => ({
      ...prev,
      details: {
        ...prev.details,
        [field]: [...(prev.details[field] || []), '']
      }
    }));
  };
  const updateStringField = (field, index, value) => {
    const newArr = [...formData.details[field]];
    newArr[index] = value;
    setFormData(prev => ({
      ...prev,
      details: { ...prev.details, [field]: newArr }
    }));
  };

  const removeStringField = (field, index) => {
    const newArr = formData.details[field].filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      details: { ...prev.details, [field]: newArr }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert tech stack from comma string to array if it's a string
    let finalTechStack = formData.techStack;
    if (typeof finalTechStack === 'string') {
      finalTechStack = finalTechStack.split(',').map(s => s.trim()).filter(Boolean);
    }

    const payload = {
      ...formData,
      techStack: finalTechStack,
      links: {
        ...formData.links,
        hasDetails: true
      }
    };
    onSave(payload);
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}><FiX size={24} /></button>
        
        <h2 className="gradient-text">{initialData ? 'Edit Project' : 'Add New Project'}</h2>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Basic Info */}
          <div className={styles.formSection}>
            <h3>Basic Info</h3>
            <div className={styles.inputGroup}>
              <label>Title</label>
              <input required type="text" name="title" value={formData.title} onChange={handleChange} />
            </div>
            
            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label>Date / Timeframe</label>
                <input required type="text" name="date" value={formData.date} onChange={handleChange} placeholder="e.g. October 2025" />
              </div>
              <div className={styles.inputGroup}>
                <label>Category</label>
                <input required type="text" name="category" value={formData.category} onChange={handleChange} placeholder="e.g. Full Stack" />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>Thumbnail Image URL</label>
              <input required type="text" name="image" value={formData.image} onChange={handleChange} />
            </div>

            <div className={styles.inputGroup}>
              <label>Description</label>
              <textarea required name="description" rows="3" value={formData.description} onChange={handleChange}></textarea>
            </div>

            <div className={styles.inputGroup}>
              <label>Tech Stack (comma separated)</label>
              <input required type="text" name="techStack" value={typeof formData.techStack === 'string' ? formData.techStack : formData.techStack.join(', ')} onChange={handleChange} placeholder="React, Node.js, MongoDB" />
            </div>
          </div>

          {/* Links */}
          <div className={styles.formSection}>
            <h3>Links</h3>
            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label>GitHub URL</label>
                <input type="text" name="github" value={formData.links.github} onChange={handleLinkChange} />
              </div>
              <div className={styles.inputGroup}>
                <label>Live URL</label>
                <input type="text" name="live" value={formData.links.live || ''} onChange={handleLinkChange} />
              </div>
            </div>
          </div>

          {/* Detailed Content */}
          <div className={styles.formSection}>
            <h3>Detailed Content (Modal)</h3>
            <div className={styles.inputGroup}>
              <label>Problem Statement</label>
              <textarea name="problemStatement" rows="3" value={formData.details.problemStatement} onChange={handleDetailsChange}></textarea>
            </div>

            <div className={styles.docsSection}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <label>External Documents (PRDs, PPTs, PDFs)</label>
                <button type="button" onClick={addDocument} className={styles.addSmallBtn}><FiPlus/> Add Doc</button>
              </div>
              
              {formData.details.documents.map((doc, idx) => (
                <div key={idx} className={styles.docRow}>
                  <input type="text" placeholder="Title (e.g. Technical Spec)" value={doc.title} onChange={e => updateDocument(idx, 'title', e.target.value)} />
                  <input type="text" placeholder="URL (e.g. Google Drive Link)" value={doc.url} onChange={e => updateDocument(idx, 'url', e.target.value)} />
                  <button type="button" onClick={() => removeDocument(idx)} className={styles.removeBtn}><FiTrash2/></button>
                </div>
              ))}
            </div>

            <div className={styles.docsSection}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <label>Media Screenshots</label>
                <button type="button" onClick={() => addObjectField('media')} className={styles.addSmallBtn}><FiPlus/> Add Media</button>
              </div>
              
              {formData.details.media.map((mediaItem, idx) => (
                <div key={idx} className={styles.docRow}>
                  <input type="text" placeholder="Title (e.g. Dashboard View)" value={mediaItem.title || ''} onChange={e => updateObjectField('media', idx, 'title', e.target.value)} />
                  <input type="text" placeholder="Image URL (e.g. https://...)" value={mediaItem.url || mediaItem} onChange={e => updateObjectField('media', idx, 'url', e.target.value)} />
                  <button type="button" onClick={() => removeObjectField('media', idx)} className={styles.removeBtn}><FiTrash2/></button>
                </div>
              ))}
            </div>

            <div className={styles.docsSection}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <label>Architecture Diagrams</label>
                <button type="button" onClick={() => addObjectField('diagrams')} className={styles.addSmallBtn}><FiPlus/> Add Diagram</button>
              </div>
              
              {formData.details.diagrams.map((diagramItem, idx) => (
                <div key={idx} className={styles.docRow}>
                  <input type="text" placeholder="Title (e.g. Database Schema)" value={diagramItem.title || ''} onChange={e => updateObjectField('diagrams', idx, 'title', e.target.value)} />
                  <input type="text" placeholder="Image URL (e.g. https://...)" value={diagramItem.url || diagramItem} onChange={e => updateObjectField('diagrams', idx, 'url', e.target.value)} />
                  <button type="button" onClick={() => removeObjectField('diagrams', idx)} className={styles.removeBtn}><FiTrash2/></button>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.actions}>
            <button type="button" onClick={onClose} className="btn">Cancel</button>
            <button type="submit" className="btn btn-primary">Save Project</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectFormModal;
