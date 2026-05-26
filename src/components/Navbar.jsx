import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import { 
  FiMenu, FiX, FiMoon, FiSun, FiChevronLeft,
  FiHome, FiStar, FiBookOpen, FiBriefcase, FiAward, FiMail, FiTrendingUp,
  FiDownloadCloud
} from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { useDev } from '../context/DevContext';

const Navbar = ({ isSidebarOpen, toggleSidebar }) => {
  const logoUrl = 'https://github.com/user-attachments/assets/fefd3c0d-32ee-4750-9bc1-91655529998f';
  const [activeSection, setActiveSection] = useState('home');
  const { isDarkMode, toggleTheme } = useTheme();
  const { isDevMode, toggleDevMode, logoutDevMode, generateExportData } = useDev();

  const handleLogoDoubleClick = (e) => {
    e.preventDefault();
    if (isDevMode) {
      logoutDevMode();
      alert("Developer Mode Disabled");
    } else {
      const pwd = window.prompt("Enter Developer Password:");
      if (pwd) {
        const success = toggleDevMode(pwd);
        if (success) {
          alert("Developer Mode Unlocked! You can now edit the portfolio.");
        } else {
          alert("Incorrect password.");
        }
      }
    }
  };

  const handleExport = () => {
    const dataString = generateExportData();
    navigator.clipboard.writeText(dataString);
    alert("Export copied to clipboard! Paste this into src/data.js to permanently save your changes.");
  };

  const navItems = [
    { name: 'Home', id: 'home', icon: <FiHome /> },
    { name: 'Updates', id: 'updates', icon: <FiTrendingUp /> },
    { name: 'Skills', id: 'skills', icon: <FiStar /> },
    { name: 'Projects', id: 'projects', icon: <FiBriefcase /> },
    { name: 'Achievements', id: 'achievements', icon: <FiAward /> },
    { name: 'Certificates', id: 'certifications', icon: <FiBookOpen /> },
    { name: 'Contact', id: 'contact', icon: <FiMail /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const activeOffset = 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.getBoundingClientRect().top <= activeOffset) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Mobile hamburger button to open sidebar when it is hidden */}
      {!isSidebarOpen && (
        <button 
          className={styles.floatingHamburger} 
          onClick={toggleSidebar}
          aria-label="Open sidebar"
        >
          <FiMenu size={24} />
        </button>
      )}

      <nav className={`${styles.navbar} ${isSidebarOpen ? styles.navbarOpen : styles.navbarClosed}`}>
        <div className={styles.navInner}>
          
          <div className={styles.logoRow}>
            <a href="#home" className={styles.logo} onDoubleClick={handleLogoDoubleClick} title="Double click for Dev Mode">
              <div className={styles.logoIconWrapper}>
                <img src={logoUrl} alt="Portfolio logo" className={styles.logoImage} />
              </div>
            </a>
            
            {/* Desktop hide button */}
            <button className={styles.hideSidebarBtn} onClick={toggleSidebar} aria-label={isSidebarOpen ? 'Hide sidebar' : 'Open sidebar'}>
              {isSidebarOpen ? <FiChevronLeft size={20} /> : <FiMenu size={20} />}
            </button>
            
            {/* Mobile close button */}
            <button className={styles.mobileCloseBtn} onClick={toggleSidebar} aria-label="Close menu">
              <FiX size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <div className={styles.navLinks}>
            {navItems.map(item => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`${styles.navLink} ${activeSection === item.id ? styles.active : ''}`}
                onClick={() => {
                  setActiveSection(item.id);
                  if (window.innerWidth <= 900) toggleSidebar();
                }}
              >
                <span className={styles.navIcon}>{item.icon}</span>
                <span className={styles.navText}>{item.name}</span>
              </a>
            ))}
            
            {/* Theme toggle included inside mobile menu for mobile view */}
            <div className={styles.navActionsMobile}>
               <button onClick={toggleTheme} className={styles.themeToggle} aria-label="Toggle theme">
                 {isDarkMode ? <FiSun size={20}/> : <FiMoon size={20}/>} 
                 <span style={{marginLeft: '0.75rem', fontSize: '1rem', fontWeight: '500'}}>Switch Theme</span>
               </button>
            </div>
          </div>

          {/* Desktop Actions at the bottom of the sidebar */}
          <div className={styles.navActions} style={{ flexDirection: 'column', gap: '1rem', alignItems: 'stretch' }}>
            <button onClick={toggleTheme} className={styles.themeToggle} aria-label="Toggle theme">
              <div className={styles.themeIconWrapper}>
                {isDarkMode ? <FiSun size={20}/> : <FiMoon size={20}/>}
              </div>
              <span className={styles.themeText}>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
            
            {isDevMode && (
              <button onClick={handleExport} className={styles.exportToggle} aria-label="Export Data" title="Export all dev changes to clipboard">
                <div className={styles.themeIconWrapper}>
                  <FiDownloadCloud size={20}/>
                </div>
                <span className={styles.themeText}>Export Code</span>
              </button>
            )}
          </div>

        </div>
      </nav>
    </>
  );
};

export default Navbar;
