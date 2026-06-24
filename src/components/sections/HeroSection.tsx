import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Download,
  MessageCircle,
  Briefcase,
} from 'lucide-react';
import DeveloperMonitor from '../monitor/DeveloperMonitor';

interface HeroSectionProps {
  currentSection: string;
}

export default function HeroSection({ currentSection }: HeroSectionProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const roles = [
    'MERN Stack Developer',
    'React Developer',
    'Frontend Developer',
    'Full Stack Developer',
    'Web Application Developer',
  ];

  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
  id="hero"
className="min-h-screen lg:min-h-screen flex items-center justify-center relative overflow-hidden pt-10 lg:pt-32 pb-10">
        {/* Background Glow */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />

      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
    </div>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-4 lg:gap-16 items-center">
          <motion.div
className="order-2 lg:order-1 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/25"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
              <span className="text-primary-400 font-mono text-sm">
                Available for opportunities
              </span>
            </motion.div>

           <motion.h1 className="text-4xl sm:text-5xl lg:text-7xl font-black mb-3 leading-tight mb-4">
  <span className="block text-white">
    Hi, I'm
 </span>
<motion.span
className="block gradient-text"
  initial={{ opacity: 0, y: 50 }}
  animate={{
    opacity: 1,
    y: [0, -3, 0],
scale: [1, 1.01, 1],  }}
  transition={{
    opacity: { duration: 1 },
    y: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
    scale: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }}
  style={{
  textShadow:
    "0 0 8px rgba(139,92,246,0.3)",
}}
>
  Primal 
</motion.span>
</motion.h1>

            {/* Animated Role */}
            {/* Animated Role */}
<motion.div
  key={roleIndex}
  className="h-10 mb-3"
  initial={{ x: -80, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{
    duration: 0.8,
    ease: "easeOut"
  }}
>
  <span className="text-blue-300 text-xl sm:text-2xl font-medium tracking-wide">
    {roles[roleIndex]}
  </span>

  <span className="animate-pulse text-primary-400 ml-1">
    |
  </span>
</motion.div>

            <motion.p
              className="text-slate-300 text-base mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Crafting fast, scalable, and user-focused web applications
using React, Node.js, Express, MongoDB, and modern UI technologies.
            </motion.p>

            <motion.div
 className="flex flex-wrap gap-2 mb-6"
>
 {["React","Node.js","Express","MongoDB","TypeScript"].map((tech) => (
  <motion.span
    key={tech}
    whileHover={{
      scale: 1.1,
      y: -4,
    }}
    className="px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/30 text-primary-300 text-sm cursor-pointer"
  >
    {tech}
  </motion.span>
))}
</motion.div>
            <motion.div
              className="flex flex-wrap gap-3 justify-center lg:justify-start mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <button
                onClick={() => scrollToSection('projects')}
className="neon-button flex items-center gap-2 text-white hover:scale-105 transition-all duration-300"              >
                <ExternalLink className="w-4 h-4" />
                View Projects
              </button>

              <a
                href="#"
className="neon-button flex items-center gap-2 text-white hover:scale-105 transition-all duration-300"
                onClick={(e) => e.preventDefault()}
              >
                <Download className="w-4 h-4" />
                Resume
              </a>

              <button
                onClick={() => scrollToSection('contact')}
                className="neon-button-outline flex items-center gap-2 text-white"
              >
                <MessageCircle className="w-4 h-4" />
                Contact
              </button>
            </motion.div>

            <motion.div
              className="flex gap-3 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary-500/15 hover:border-primary-500/40 transition-all duration-300"
              >
                <Github className="w-5 h-5 text-gray-400 hover:text-primary-400" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-cyan-500/15 hover:border-cyan-500/40 transition-all duration-300"
              >
                <Linkedin className="w-5 h-5 text-gray-400 hover:text-cyan-400" />
              </a>

              <a
                href="mailto:primald39@gmail.com"
                aria-label="Email"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary-500/15 hover:border-primary-500/40 transition-all duration-300"
              >
                <Mail className="w-5 h-5 text-gray-400 hover:text-primary-400" />
              </a>
            </motion.div>
          </motion.div>

          <motion.div
className="order-1 lg:order-2 mb-2 lg:mb-0 flex justify-center "
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
<div className="scale-75 sm:scale-90 lg:scale-100 origin-top">
  <DeveloperMonitor section={currentSection} />
</div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-primary-500/40 rounded-full flex justify-center cursor-pointer"
          onClick={() => scrollToSection('skills')}
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-3 bg-primary-500 rounded-full mt-2"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}