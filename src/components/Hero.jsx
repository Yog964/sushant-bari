import React, { useState, useEffect, useCallback } from 'react';
import { personalInfo } from '../data';
import styles from './Hero.module.css';
import { FiArrowDown, FiDownload, FiGithub, FiLinkedin } from 'react-icons/fi';
import { SiLeetcode, SiCodeforces, SiYoutube } from 'react-icons/si';

const fetchWithCache = async (url, cacheKey, ttl = 3600000) => {
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    try {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < ttl) return data;
    } catch (e) {
      // ignore
    }
  }
  const response = await fetch(url);
  if (!response.ok) throw new Error(`API returned ${response.status}`);
  const data = await response.json();
  localStorage.setItem(cacheKey, JSON.stringify({ data, timestamp: Date.now() }));
  return data;
};

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
    Promise.allSettled([
      fetchWithCache('https://alfa-leetcode-api.onrender.com/Spb25/solved', 'lc_solved'),
      fetchWithCache('https://alfa-leetcode-api.onrender.com/Spb25/badges', 'lc_badges')
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
        <div className={styles.fallbackState}>
          <div className={styles.loadingSpinner}>Stats temporarily unavailable</div>
          <a href="https://leetcode.com/u/Spb25/" target="_blank" rel="noreferrer" className={`${styles.btn} ${styles.btnOutline} ${styles.lcBtn}`}>
            View Profile ↗
          </a>
        </div>
      )}
    </a>
  );
};


const CodeforcesWidget = () => {
  const CF_HANDLE = 'spb25';
  const [cfData, setCfData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCF = async () => {
      try {
        const [infoRes, ratingRes, statusRes] = await Promise.allSettled([
          fetchWithCache(`https://codeforces.com/api/user.info?handles=${CF_HANDLE}`, `cf_info_${CF_HANDLE}`),
          fetchWithCache(`https://codeforces.com/api/user.rating?handle=${CF_HANDLE}`, `cf_rating_${CF_HANDLE}`),
          fetchWithCache(`https://codeforces.com/api/user.status?handle=${CF_HANDLE}&from=1&count=10000`, `cf_status_${CF_HANDLE}`),
        ]);

        const info   = infoRes.status   === 'fulfilled' && infoRes.value.status   === 'OK' ? infoRes.value.result[0] : null;
        const rating = ratingRes.status === 'fulfilled' && ratingRes.value.status === 'OK' ? ratingRes.value.result  : [];
        const status = statusRes.status === 'fulfilled' && statusRes.value.status === 'OK' ? statusRes.value.result  : [];

        // Unique solved problems
        const solved = new Set(
          status
            .filter(s => s.verdict === 'OK')
            .map(s => `${s.problem.contestId}-${s.problem.index}`)
        ).size;

        // Last 7 days activity (by UTC day index)
        const solvedDaySet = new Set(
          status
            .filter(s => s.verdict === 'OK')
            .map(s => Math.floor(s.creationTimeSeconds / 86400))
        );
        const todayDay = Math.floor(Date.now() / 1000 / 86400);
        const last7 = Array.from({ length: 7 }, (_, i) => {
          const dayIdx = todayDay - (6 - i);          // oldest → newest
          const date   = new Date(dayIdx * 86400 * 1000);
          const label  = ['Su','Mo','Tu','We','Th','Fr','Sa'][date.getUTCDay()];
          return { active: solvedDaySet.has(dayIdx), label };
        });

        setCfData({ info, contests: rating.length, solved, last7 });
      } catch (e) {
        console.error('CF fetch error', e);
      } finally {
        setLoading(false);
      }
    };
    fetchCF();
  }, []);

  const getRankColor = (rank) => {
    if (!rank) return '#8c8c8c';
    if (rank.includes('legendary'))   return '#ff0000';
    if (rank.includes('international') && rank.includes('grandmaster')) return '#ff0000';
    if (rank.includes('grandmaster')) return '#ff3333';
    if (rank.includes('international') && rank.includes('master')) return '#ff8c00';
    if (rank.includes('master'))      return '#ff8c00';
    if (rank.includes('candidate'))   return '#ff8c00';
    if (rank.includes('expert'))      return '#aa00aa';
    if (rank.includes('specialist'))  return '#03a89e';
    if (rank.includes('pupil'))       return '#77ff77';
    return '#808080';
  };

  const rankColor = cfData?.info?.rank ? getRankColor(cfData.info.rank.toLowerCase()) : '#1890FF';
  const maxRating = cfData?.info?.maxRating ?? 0;
  const curRating = cfData?.info?.rating    ?? 0;

  return (
    <a
      href={`https://codeforces.com/profile/${CF_HANDLE}`}
      target="_blank"
      rel="noreferrer"
      className={`glass-card ${styles.widgetCard} ${styles.cfWidget}`}
    >
      {/* Header */}
      <div className={styles.widgetHeader}>
        <div className={styles.widgetTitle}>
          <SiCodeforces color="#1890FF" size={24} />
          <span>Codeforces Profile</span>
        </div>
        <span className={styles.username}>@{CF_HANDLE}</span>
      </div>

      {loading ? (
        <div className={styles.loadingSpinner}>Loading...</div>
      ) : cfData?.info ? (
        <>
          {/* Stats grid: circle + right stats */}
          <div className={styles.cfStatsGrid}>

            {/* Circle: Solved only */}
            <div className={styles.cfRatingCircle} style={{ borderColor: '#1890FF' }}>
              <span className={styles.cfSolvedNum}>{cfData.solved}</span>
              <span className={styles.cfPillLabel}>Solved</span>
            </div>

            {/* Right side stats */}
            <div className={styles.cfRightStats}>
              <div className={styles.cfStatRow}>
                <span className={styles.cfStatLabel}>Rating</span>
                <span className={styles.cfStatValue} style={{ color: rankColor }}>{curRating}</span>
              </div>
              <div className={styles.cfDivider} />
              <div className={styles.cfStatRow}>
                <span className={styles.cfStatLabel}>Rank</span>
                <span className={styles.cfStatValue} style={{ color: rankColor, textTransform: 'capitalize' }}>
                  {cfData.info.rank || '—'}
                </span>
              </div>
              <div className={styles.cfDivider} />
              <div className={styles.cfStatRow}>
                <span className={styles.cfStatLabel}>Max Rating</span>
                <span className={styles.cfStatValue}>{maxRating}</span>
              </div>
              <div className={styles.cfDivider} />
              <div className={styles.cfStatRow}>
                <span className={styles.cfStatLabel}>Contests</span>
                <span className={styles.cfStatValue}>{cfData.contests}</span>
              </div>
            </div>
          </div>

          {/* 7-day activity grid + View Profile */}
          <div className={styles.cfActivityRow}>
            <div className={styles.cfActivityGrid}>
              {cfData.last7.map((day, i) => (
                <div key={i} className={styles.cfDayCol}>
                  <div
                    className={styles.cfDayCell}
                    style={{
                      background: day.active
                        ? 'rgba(34, 197, 94, 0.85)'
                        : 'var(--bg-secondary)',
                      boxShadow: day.active
                        ? '0 0 8px rgba(34, 197, 94, 0.5)'
                        : 'none',
                      border: day.active
                        ? '1px solid rgba(34, 197, 94, 0.4)'
                        : '1px solid var(--glass-border)',
                    }}
                    title={day.active ? `Solved on ${day.label}` : `No submissions on ${day.label}`}
                  />
                  <span className={styles.cfDayLabel}>{day.label}</span>
                </div>
              ))}
            </div>
            <span className={`${styles.btn} ${styles.btnOutline} ${styles.cfBtn}`}>
              View Profile ↗
            </span>
          </div>
        </>
      ) : (
        <div className={styles.fallbackState}>
          <div className={styles.loadingSpinner}>Stats temporarily unavailable</div>
          <a href={`https://codeforces.com/profile/${CF_HANDLE}`} target="_blank" rel="noreferrer" className={`${styles.btn} ${styles.btnOutline} ${styles.cfBtn}`}>
            View Profile ↗
          </a>
        </div>
      )}
    </a>
  );
};


const Hero = () => {
  const profilePhotoUrl = 'https://github.com/user-attachments/assets/c0b5573c-7ac7-42e9-9c42-1ff25bc2f19a';

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

              {/* Quick CTA buttons beside photo */}
              <div className={styles.photoCtaGroup}>
                <a href="#projects" className={`${styles.btn} ${styles.btnPrimary} ${styles.photoCtaBtn}`}>
                  View Projects <FiArrowDown />
                </a>
                <a href="https://www.youtube.com/@Aristos_2" target="_blank" rel="noreferrer" className={`${styles.btn} ${styles.youtubeBtn} ${styles.photoCtaBtn}`}>
                  <SiYoutube /> YouTube
                </a>
                <a href={personalInfo.github} target="_blank" rel="noreferrer" className={`${styles.btn} ${styles.githubBtn} ${styles.photoCtaBtn}`}>
                  <FiGithub /> GitHub
                </a>
                <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noreferrer" className={`${styles.btn} ${styles.linkedinBtn} ${styles.photoCtaBtn}`}>
                  <FiLinkedin /> LinkedIn
                </a>
                <a href="https://drive.google.com/file/d/1qXg1xY4cd2MFuTxYGyFWwJ-25fjXIyeU/view?usp=drive_link" target="_blank" rel="noreferrer" className={`${styles.btn} ${styles.resumeBtn} ${styles.photoCtaBtn}`}>
                  Resume <FiDownload />
                </a>
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

          <div className={styles.aboutMeContainer}>
            <h3 style={{ fontSize: '1.2rem', margin: 0, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>About Me</h3>
            <div className={styles.aboutMeBox}>
              <ul className={styles.aboutList}>
                {personalInfo.about.map((line, i) => (
                  <li key={i} className={`${styles.aboutItem} ${i === 0 ? styles.aboutItemFirst : ''}`}>
                    {i > 0 && <span className={styles.aboutBullet}>›</span>}
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN - WIDGETS & CTA */}
        <div className={styles.rightCol}>
          <div className={styles.widgetRow}>
            <LeetCodeCombinedWidget />
          </div>

          <div className={styles.widgetRow}>
            <CodeforcesWidget />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
