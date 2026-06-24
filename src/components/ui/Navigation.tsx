import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code2, Download } from 'lucide-react';
import { SECTION_ORDER } from '../../utils/helpers';
import ResumePDF from '../../assets/ats resume final.pdf';
const navItems = [
  { id: SECTION_ORDER[0], label: 'Home' },
  { id: SECTION_ORDER[1], label: 'Skills' },
  { id: SECTION_ORDER[2], label: 'Experience' },
  { id: SECTION_ORDER[3], label: 'Projects' },
  { id: SECTION_ORDER[4], label: 'Contact' },
];

interface NavigationProps {
  currentSection: string;
}
const downloadResume = () => {
  const link = document.createElement('a');
  link.href = ResumePDF;
  link.download = 'Primal_Melvita_Dsouza_Resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
export default function Navigation({ currentSection }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-dark-900/90 backdrop-blur-xl border-b border-white/10 shadow-lg'
            : 'bg-transparent'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.button
              onClick={() => scrollToSection(SECTION_ORDER[0])}
              className="flex items-center gap-2 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-8 h-8 rounded-lg bg-primary-500/20 border border-primary-500/40 flex items-center justify-center group-hover:bg-primary-500/30 transition-colors">
                <Code2 className="w-4 h-4 text-primary-400" />
              </div>
              <span className="gradient-text font-bold text-lg hidden sm:block">Primal</span>
            </motion.button>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    currentSection === item.id
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {currentSection === item.id && (
                    <motion.div
                      className="absolute inset-0 bg-primary-500/15 border border-primary-500/40 rounded-lg"
                      layoutId="nav-active"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
             <motion.button
  onClick={downloadResume}
  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white neon-button"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  <Download className="w-4 h-4" />
  Download Resume
</motion.button>
                
            </div>

            {/* Mobile hamburger */}
            <motion.button
              className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {isOpen
                ? <X className="w-5 h-5 text-white" />
                : <Menu className="w-5 h-5 text-white" />
              }
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-dark-900/95 backdrop-blur-xl"
             onClick={() => {
  downloadResume();
  setIsOpen(false);
}}
            />
            <motion.div
              className="absolute top-16 left-4 right-4 glass-card p-5"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col gap-1 mb-4">
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-4 py-3 text-left rounded-xl transition-all font-medium ${
                      currentSection === item.id
                        ? 'text-primary-400 bg-primary-500/10 border border-primary-500/30'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
              <motion.button
                onClick={() => {
  downloadResume();
  setIsOpen(false);
}}
                className="w-full neon-button flex items-center justify-center gap-2 text-white py-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Download className="w-4 h-4" />
                Download Resume
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
