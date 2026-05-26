import { useEffect, useMemo, useState } from 'react';
import styles from './LoadingScreen.module.css';

const LoadingScreen = ({ progress }) => {
  const bootLines = useMemo(() => [
    'boot portfolio.runtime',
    'profile: Sushant Bari | VIT Pune | CGPA 9.41',
    'stack: React, FastAPI, Python, C++, Flutter, MongoDB',
    'loading project modules...',
    'module loaded: DrowsiGuard / AI driver safety',
    'module loaded: SignSpeak / inclusive communication',
    'module loaded: CosmoPH / scientific computing',
    'module loaded: Adaptive OS Memory Engine / systems intelligence',
    'module loaded: GasPulse / IoT safety monitoring',
    'module loaded: LocalSync / offline LAN file sharing',
    'mounting publications and research papers...',
    'mounting hackathon achievements...',
    'mounting certifications and credentials...',
    'sync: LeetCode profile widget',
    'status: ready'
  ], []);
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    const targetCount = Math.max(1, Math.ceil((progress / 100) * bootLines.length));
    setVisibleCount(prev => Math.max(prev, targetCount));
  }, [bootLines.length, progress]);

  useEffect(() => {
    if (visibleCount >= bootLines.length) return undefined;
    const timer = window.setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + 1, bootLines.length));
    }, 180);
    return () => window.clearTimeout(timer);
  }, [bootLines.length, visibleCount]);

  const currentStage = progress < 35 ? 'Loading assets' : progress < 70 ? 'Compiling modules' : progress < 100 ? 'Finalizing interface' : 'Ready';

  return (
    <div className={styles.loader}>
      <div className={styles.terminal}>
        <div className={styles.topBar}>
          <div className={styles.windowDots}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <span className={styles.path}>Sushant Bari Portfolio / boot.sequence</span>
          <span className={styles.status}>{currentStage}</span>
        </div>

        <div className={styles.body}>
          <div className={styles.identity}>
            <div className={styles.logoMark}>SB</div>
            <div>
              <p>Sushant Bari Portfolio Kernel v9.41</p>
              <span>Engineering dashboard initializing</span>
            </div>
          </div>

          <div className={styles.logPanel}>
            {bootLines.slice(0, visibleCount).map((line, index) => (
              <div key={line} className={styles.logLine} style={{ animationDelay: `${index * 0.035}s` }}>
                <span>&gt;</span>
                <code>{line}</code>
              </div>
            ))}
            <div className={styles.cursorLine}>
              <span>&gt;</span>
              <code>{progress === 100 ? 'Entering portfolio...' : 'processing GitHub-hosted visuals...'}</code>
              <i></i>
            </div>
          </div>

          <div className={styles.metrics}>
            <span>React</span>
            <span>FastAPI</span>
            <span>AI/ML</span>
            <span>IoT</span>
            <span>Research</span>
            <span>Systems</span>
          </div>

          <div className={styles.copy}>
            <span>{currentStage}</span>
            <strong>{progress}%</strong>
          </div>
          <div className={styles.track}>
            <div className={styles.bar} style={{ width: `${progress}%` }} />
          </div>
          <div className={styles.milestones}>
            <span className={progress >= 25 ? styles.activeMilestone : ''}>Assets</span>
            <span className={progress >= 50 ? styles.activeMilestone : ''}>Projects</span>
            <span className={progress >= 75 ? styles.activeMilestone : ''}>Credentials</span>
            <span className={progress >= 100 ? styles.activeMilestone : ''}>Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
