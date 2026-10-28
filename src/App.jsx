import { useState, useEffect, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LoadingScreen from './components/LoadingScreen';
import { useDev } from './context/DevContext';
import './index.css';

// Lazy-loaded components (below the fold)
const Highlights = lazy(() => import('./components/Highlights'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Achievements = lazy(() => import('./components/Achievements'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

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
    const minimumLoaderTime = 1800; // Minimum duration to prevent screen flickering
    const maxLoaderTime = 3000; // Hard cap: max 3 seconds loading screen
    const fixedAssets = [
      'https://github.com/user-attachments/assets/fefd3c0d-32ee-4750-9bc1-91655529998f',
      'https://github.com/user-attachments/assets/45d46793-53a0-49aa-88b8-2503e5f73364',
      'https://github.com/user-attachments/assets/a7465aad-d2ff-47bc-aedb-608cb87e181a'
    ];

    // Only preload critical fixed assets, let the rest lazy load natively
    const assetUrls = fixedAssets
      .filter(Boolean)
      .filter(url => url.includes('github.com/user-attachments'));

    const uniqueUrls = [...new Set(assetUrls)];

    let completed = 0;
    let isCancelled = false;
    let finishTimer = null;

    const finishLoading = () => {
      if (isCancelled) return;
      setLoadingProgress(100);
      setIsLoading(false);
    };

    // Hard cap: After maxLoaderTime (3s), dismiss loading screen regardless of asset state
    const maxTimer = window.setTimeout(() => {
      finishLoading();
    }, maxLoaderTime);

    if (uniqueUrls.length === 0) {
      finishTimer = window.setTimeout(finishLoading, minimumLoaderTime);
      return () => {
        window.clearTimeout(maxTimer);
        if (finishTimer) window.clearTimeout(finishTimer);
      };
    }

    const completeOne = () => {
      if (isCancelled) return;
      completed += 1;
      const nextProgress = Math.round((completed / uniqueUrls.length) * 100);
      setLoadingProgress(nextProgress);

      if (completed === uniqueUrls.length) {
        window.clearTimeout(maxTimer);
        const elapsed = Date.now() - loaderStartedAt;
        const remainingTime = Math.max(0, minimumLoaderTime - elapsed);

        finishTimer = window.setTimeout(() => {
          finishLoading();
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
      window.clearTimeout(maxTimer);
      if (finishTimer) window.clearTimeout(finishTimer);
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
        <Suspense fallback={<div style={{ minHeight: '100vh' }}></div>}>
          <Highlights />
          <Skills />
          <section id="projects">
            <Projects />
          </section>
          <Achievements />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
