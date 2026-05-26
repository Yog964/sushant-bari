import React from 'react';
import styles from './Footer.module.css';
import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from 'react-icons/fi';
import { personalInfo } from '../data';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.brand}>
          <h3 className="gradient-text">Sushant Bari</h3>
          <p className={styles.tagline}>Building the future, one line at a time.</p>
        </div>

        <div className={styles.links}>
          <a href="#home">Home</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>

        <div className={styles.socials}>
          <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FiLinkedin /></a>
          <a href={personalInfo.github} target="_blank" rel="noreferrer" aria-label="GitHub"><FiGithub /></a>
          <a href={`mailto:${personalInfo.email}`} aria-label="Email"><FiMail /></a>
        </div>

        <div className={styles.bottomRow}>
          <p>© 2026 Sushant Bari. All rights reserved.</p>
          <button onClick={scrollToTop} className={styles.topBtn} aria-label="Back to top">
            <FiArrowUp /> Top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
