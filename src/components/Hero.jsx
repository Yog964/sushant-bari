import React, { useState, useEffect, useCallback } from 'react';
import { personalInfo } from '../data';
import styles from './Hero.module.css';
import { FiArrowDown, FiDownload, FiGithub, FiLinkedin } from 'react-icons/fi';
import { SiLeetcode } from 'react-icons/si';

const TypingText = ({ words }) => {
  const [displayText, setDisplayText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 3000);
      return () => clearTimeout(pauseTimer);
    }

    const currentWord = words[wordIndex];

    if (!isDeleting) {
      if (charIndex < currentWord.length) {
        const timer = setTimeout(() => {
          setDisplayText(currentWord.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, 120);
        return () => clearTimeout(timer);
      } else {
        setIsPaused(true);
      }
    } else {
      if (charIndex > 0) {
        const timer = setTimeout(() => {
          setDisplayText(currentWord.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, 80);
        return () => clearTimeout(timer);
      } else {
        setIsDeleting(false);
        setWordIndex((wordIndex + 1) % words.length);
      }
    }
  }, [charIndex, isDeleting, isPaused, wordIndex, words]);

  return (
    <span>
      {displayText}
      <span className={styles.cursor}>|</span>
    </span>
  );
};

const LeetCodeCombinedWidget = () => {
  const [lcData, setLcData] = useState(null);
  const [badgeData, setBadgeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJson = async (url) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`LeetCode API returned ${response.status}`);
      }
      return response.json();
    };

    Promise.allSettled([
      fetchJson('https://alfa-leetcode-api.onrender.com/Spb25/solved'),
      fetchJson('https://alfa-leetcode-api.onrender.com/Spb25/badges')
    ])
    .then(([solvedResult, badgesResult]) => {
      if (solvedResult.status === 'fulfilled') setLcData(solvedResult.value);
      if (badgesResult.status === 'fulfilled') setBadgeData(badgesResult.value);
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  return (
    <a href="https://leetcode.com/u/Spb25/" target="_blank" rel="noreferrer" className={`glass-card ${styles.widgetCard} ${styles.lcWidget}`}>
      <div className={styles.widgetHeader}>
        <div className={styles.widgetTitle}>
          <SiLeetcode color="#FFA116" size={24} />
          <span>LeetCode Profile</span>
        </div>
        <span className={styles.username}>@Spb25</span>
      </div>
      
      {loading ? (
        <div className={styles.loadingSpinner}>Loading...</div>
      ) : lcData ? (
        <>
          <div className={styles.lcStatsGrid}>
            <div className={styles.lcTotal}>
              <span className={styles.lcTotalNum}>{lcData.solvedProblem || 0}</span>
              <span className={styles.lcLabel}>Solved</span>
            </div>
            <div className={styles.lcBars}>
              <div className={styles.lcBarGroup}>
                <div className={styles.lcLabelGroup}>
                  <span style={{color: '#00b8a3'}}>Easy</span>
                  <span>{lcData.easySolved || 0}</span>
                </div>
                <div className={styles.lcProgressBar}><div style={{width: `${(lcData.easySolved / lcData.solvedProblem) * 100}%`, background: '#00b8a3'}}></div></div>
              </div>
              <div className={styles.lcBarGroup}>
                <div className={styles.lcLabelGroup}>
                  <span style={{color: '#ffc01e'}}>Med</span>
                  <span>{lcData.mediumSolved || 0}</span>
                </div>
                <div className={styles.lcProgressBar}><div style={{width: `${(lcData.mediumSolved / lcData.solvedProblem) * 100}%`, background: '#ffc01e'}}></div></div>
              </div>
              <div className={styles.lcBarGroup}>
                <div className={styles.lcLabelGroup}>
                  <span style={{color: '#ff375f'}}>Hard</span>
                  <span>{lcData.hardSolved || 0}</span>
                </div>
                <div className={styles.lcProgressBar}><div style={{width: `${(lcData.hardSolved / lcData.solvedProblem) * 100}%`, background: '#ff375f'}}></div></div>
              </div>
            </div>
          </div>
          
          <div className={styles.badgesDivider}></div>
          
          <div className={styles.badgesRow}>
            <div className={styles.badgesContainer}>
              {badgeData?.badges?.length > 0 ? (
                badgeData.badges.map(badge => (
                  <div key={badge.id} className={styles.badgeItem} title={badge.displayName}>
                    <img src={badge.icon.startsWith('http') ? badge.icon : `https://leetcode.com${badge.icon}`} alt={badge.displayName} className={styles.badgeImg} />
                    <span className={styles.badgeName}>{badge.displayName}</span>
                  </div>
                ))
              ) : null}
            </div>
            <div className={styles.lcProfileBtnContainer}>
              <span className={`${styles.btn} ${styles.btnOutline} ${styles.lcBtn}`}>
                View Profile ↗
              </span>
            </div>
          </div>
        </>
      ) : (
        <div className={styles.loadingSpinner}>Stats temporarily unavailable</div>
      )}
    </a>
  );
};


const Hero = () => {
  const profilePhotoUrl = 'https://github.com/user-attachments/assets/e9de0749-0299-451c-89a1-1ac86883b8e3';

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContent}>
        
        {/* LEFT COLUMN - INTRO & CTA */}
        <div className={`glass-card ${styles.leftCol}`}>
          <div className={styles.introBlock}>
            
            <div className={styles.topRow}>
              <div className={styles.photoWrapper}>
                <img src={profilePhotoUrl} alt={`${personalInfo.name} profile`} className={styles.photo} />
              </div>

              {/* Education Badge */}
              <div className={styles.educationBadge}>
                <div className={styles.eduIconWrapper}>🎓</div>
                <div className={styles.eduTextWrapper}>
                  <div className={styles.eduDegree}>Bachelor of Technology in Computer Science</div>
                  <div className={styles.eduMeta}>
                    <span>Vishwakarma Institute of Technology, Pune</span>
                    <span className={styles.eduDot}> | </span>
                    <span className={styles.eduYear}>CGPA {personalInfo.stats.cgpa}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={styles.textBlock}>
              <h1 className={styles.title}>
                Hi, I'm <span className="gradient-text">{personalInfo.name}</span>👋
              </h1>
              <div className={styles.typingWrapper}>
                <TypingText words={personalInfo.roles} />
              </div>
              <div className={styles.tagline}>
                {personalInfo.tagline}
              </div>
            </div>
          </div>

          <div className={styles.aboutMe}>
            <h3 style={{ fontSize: '1.2rem', margin: 0, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>About Me</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0, fontSize: '0.95rem' }}>{personalInfo.about}</p>
          </div>
        </div>

        {/* RIGHT COLUMN - WIDGETS & CTA */}
        <div className={styles.rightCol}>
          <div className={styles.widgetRow}>
            <LeetCodeCombinedWidget />
          </div>
          
          <div className={styles.ctaGroupRight}>
            <div className={styles.ctaGroup}>
              <a href="#projects" className={`${styles.btn} ${styles.btnPrimary}`}>
                View Projects <FiArrowDown />
              </a>
              <a href="https://drive.google.com/file/d/1JYDd-n25f4hZjV7aouXja1J8lZB7sVbt/view?usp=sharing" target="_blank" rel="noreferrer" className={`${styles.btn} ${styles.resumeBtn}`}>
                Download Resume <FiDownload />
              </a>
              <a href={personalInfo.github} target="_blank" rel="noreferrer" className={`${styles.btn} ${styles.githubBtn}`}>
                <FiGithub /> GitHub ↗
              </a>
              <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noreferrer" className={`${styles.btn} ${styles.linkedinBtn}`}>
                <FiLinkedin /> LinkedIn ↗
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
