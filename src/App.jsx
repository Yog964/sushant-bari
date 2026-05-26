import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Highlights from './components/Highlights';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import { useDev } from './context/DevContext';
import './index.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const { projects, achievements, certifications } = useDev();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 900) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const loaderStartedAt = Date.now();
    const minimumLoaderTime = 5000;
    const fixedAssets = [
      'https://github.com/user-attachments/assets/fefd3c0d-32ee-4750-9bc1-91655529998f',
      'https://github.com/user-attachments/assets/e9de0749-0299-451c-89a1-1ac86883b8e3',
      'https://github.com/user-attachments/assets/a7465aad-d2ff-47bc-aedb-608cb87e181a'
    ];

    const getUrl = (item) => typeof item === 'string' ? item : item?.url;
    const assetUrls = [
      ...fixedAssets,
      ...projects.flatMap(project => [
        project.image,
        ...(project.details?.media || []).map(getUrl),
        ...(project.details?.diagrams || []).map(getUrl)
      ]),
      ...achievements.map(item => item.image),
      ...certifications.map(item => item.image)
    ]
      .filter(Boolean)
      .filter(url => url.includes('github.com/user-attachments'));

    const uniqueUrls = [...new Set(assetUrls)];

    if (uniqueUrls.length === 0) {
      setLoadingProgress(100);
      window.setTimeout(() => setIsLoading(false), minimumLoaderTime);
      return;
    }

    let completed = 0;
    let isCancelled = false;

    const completeOne = () => {
      if (isCancelled) return;
      completed += 1;
      const nextProgress = Math.round((completed / uniqueUrls.length) * 100);
      setLoadingProgress(nextProgress);

      if (completed === uniqueUrls.length) {
        const elapsed = Date.now() - loaderStartedAt;
        const remainingTime = Math.max(0, minimumLoaderTime - elapsed);

        window.setTimeout(() => {
          if (!isCancelled) setIsLoading(false);
        }, remainingTime);
      }
    };

    uniqueUrls.forEach(url => {
      const image = new Image();
      image.onload = completeOne;
      image.onerror = completeOne;
      image.src = url;
    });

    return () => {
      isCancelled = true;
    };
  }, [projects, achievements, certifications]);

  return (
    <div className={`app ${isSidebarOpen ? 'sidebarOpen' : 'sidebarClosed'}`}>
      {isLoading && <LoadingScreen progress={loadingProgress} />}
      <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <main>
        <section id="home">
          <Hero />
        </section>
        <Highlights />
        <Skills />
        <section id="projects">
          <Projects />
        </section>
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
