import React, { useState } from 'react';
import { personalInfo } from '../data';
import styles from './Contact.module.css';
import { FiMail, FiMapPin, FiSend, FiGithub, FiLinkedin } from 'react-icons/fi';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    // Placeholder - connect to Formspree or EmailJS
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus(null), 3000);
    }, 1000);
  };

  return (
    <section className="section-container" id="contact">
      <h2 className="gradient-text" style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '1rem' }}>
        Get In Touch
      </h2>
      <p className={styles.subtitle}>Have a project idea? Let's talk</p>

      <div className={styles.contactGrid}>
        {/* Info Column */}
        <div className={styles.infoCol}>
          <div className={`glass-card ${styles.infoCard}`}>
            <div className={styles.infoItem}>
              <div className={styles.infoIcon}><FiMail /></div>
              <div>
                <h4>Email</h4>
                <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
              </div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.infoIcon}><FiMapPin /></div>
              <div>
                <h4>Location</h4>
                <span>{personalInfo.location}</span>
              </div>
            </div>
          </div>

          <div className={styles.socialLinks}>
            <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noreferrer" className={`glass-card ${styles.socialCard}`}>
              <FiLinkedin size={22} />
              <span>LinkedIn</span>
            </a>
            <a href={personalInfo.github} target="_blank" rel="noreferrer" className={`glass-card ${styles.socialCard}`}>
              <FiGithub size={22} />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        {/* Form Column */}
        <form className={`glass-card ${styles.form}`} onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="Your name" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="your@email.com" />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="subject">Subject</label>
            <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required placeholder="What's this about?" />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} required placeholder="Your message..." />
          </div>
          <button type="submit" className={styles.submitBtn} disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending...' : <><FiSend /> Send Message</>}
          </button>
          {status === 'success' && <p className={styles.successMsg}>✅ Message sent successfully!</p>}
        </form>
      </div>
    </section>
  );
};

export default Contact;
