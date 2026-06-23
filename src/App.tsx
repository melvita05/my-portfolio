import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useCurrentSection } from './hooks/useCurrentSection';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import Navigation from './components/ui/Navigation';
import Footer from './components/sections/Footer';
import DeveloperActivityWidget from './components/ui/DeveloperActivityWidget';


const DynamicBackground = lazy(() => import('./components/background/DynamicBackground'));
const FloatingParticles = lazy(() => import('./components/background/FloatingParticles'));
const HeroSection = lazy(() => import('./components/sections/HeroSection'));
const SkillsSection = lazy(() => import('./components/sections/SkillsSection'));
const ExperienceSection = lazy(() => import('./components/sections/ExperienceSection'));
const ProjectsSection = lazy(() => import('./components/sections/ProjectsSection'));
const ContactSection = lazy(() => import('./components/sections/ContactSection'));
const AboutSection = lazy(() => import('./components/sections/AboutSection'));

const SectionLoader = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <motion.div
      className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
  </div>
);

function App() {
  useSmoothScroll();
  const currentSection = useCurrentSection(0.3);

  const getBackgroundVariant = () => {
    switch (currentSection) {
      case 'skills': return 'skills';
      case 'experience': return 'experience';
      case 'projects': return 'projects';
      case 'contact': return 'contact';
      default: return 'default';
    }
  };

  return (
  <div className="relative bg-dark-900 text-white overflow-x-hidden">

    

    <Suspense fallback={<SectionLoader />}>
      <DynamicBackground variant={getBackgroundVariant()} />
    </Suspense>

      <Suspense fallback={null}>
        <FloatingParticles />
      </Suspense>

      <Navigation currentSection={currentSection} />

      <main className="relative z-10">
        <Suspense fallback={<SectionLoader />}>
  <HeroSection currentSection={currentSection} />
</Suspense>

<Suspense fallback={<SectionLoader />}>
  <AboutSection />
</Suspense>

<Suspense fallback={<SectionLoader />}>
  <SkillsSection />
</Suspense>

        <Suspense fallback={<SectionLoader />}>
          <ExperienceSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <ProjectsSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <ContactSection />
        </Suspense>

        <Footer />
      </main>

      <DeveloperActivityWidget />

      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-primary-500/20 backdrop-blur-sm border border-primary-500/50 flex items-center justify-center shadow-neon hover:bg-primary-500/40 transition-all"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Scroll to top"
      >
        <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </motion.button>
    </div>
  );
}

export default App;
