import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Download, ExternalLink, FileText, Award, GraduationCap, Code2 } from 'lucide-react';

export default function ResumeSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const resumeHighlights = [
    { icon: GraduationCap, label: 'Education', value: 'MCA (Pursuing)' },
    { icon: Code2, label: 'Tech Stack', value: 'MERN Stack' },
    { icon: Award, label: 'Projects', value: '2 Projects' },
    { icon: FileText, label: 'Certifications', value: '5 Certificates' },
  ];

  return (
    <section id="resume" className="min-h-screen flex items-center justify-center py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.p
            className="text-primary-400 font-mono text-sm mb-2"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            MY DOCUMENT
          </motion.p>
          <motion.h2
            className="text-4xl sm:text-5xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <span className="text-white">My </span>
            <span className="gradient-text">Resume</span>
          </motion.h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            className="glass-card p-8 relative overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />

            <div className="relative">
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                <div className="w-28 h-36 bg-white/5 rounded-xl shadow-2xl flex flex-col items-center justify-center border border-white/10 relative overflow-hidden group flex-shrink-0">
                  <FileText className="w-10 h-10 text-primary-400 mb-2" />
                  <span className="text-xs text-gray-400 font-mono">Resume.pdf</span>
                  <div className="absolute bottom-0 left-0 right-0 h-3 bg-primary-500/30" />
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-white mb-1">Primal Melvita Dsouza</h3>
                  <p className="text-primary-400 mb-1">MCA Student</p>
                  <p className="text-gray-500 text-sm mb-6">Canara College, Mangalore</p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                    {resumeHighlights.map((item, i) => (
                      <motion.div
                        key={item.label}
                        className="flex flex-col items-center sm:items-start gap-2 p-3 rounded-xl bg-white/5"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.5 + i * 0.1 }}
                      >
                        <div className="w-9 h-9 rounded-lg bg-primary-500/20 flex items-center justify-center">
                          <item.icon className="w-4 h-4 text-primary-400" />
                        </div>
                        <div className="text-center sm:text-left">
                          <p className="text-gray-400 text-xs">{item.label}</p>
                          <p className="text-white text-sm font-semibold">{item.value}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <motion.button
                      className="neon-button flex items-center justify-center gap-2 text-white"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Download className="w-5 h-5" />
                      Download Resume
                    </motion.button>
                    <motion.button
                      className="neon-button-outline flex items-center justify-center gap-2 text-white"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink className="w-5 h-5" />
                      View Resume
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="mt-8 p-4 text-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
          >
            <p className="text-gray-400 text-sm">
              Looking to hire a motivated MERN Stack developer?{' '}
              <a href="#contact" className="text-primary-400 hover:text-primary-300 transition-colors" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
                Let's connect!
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
