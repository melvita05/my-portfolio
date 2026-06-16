import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, Calendar, ChevronRight } from 'lucide-react';

const experiences = [
  {
    role: 'MERN Stack Intern',
    company: 'Codelab System',
    duration: '3 Months',
    type: 'Internship',
    color: 'primary',
    responsibilities: [
      'Developed responsive user interfaces using React.js',
      'Worked with Node.js and Express.js',
      'Connected applications with MongoDB',
      'Built and tested REST APIs',
      'Participated in full-stack web application development',
      'Collaborated on real-world projects',
    ],
  },
  {
    role: 'Full Stack Developer',
    company: 'Zephyr Technologies',
    duration: '3 Months',
    type: 'Full-time',
    color: 'cyan',
    responsibilities: [
      'Developing modern web applications',
      'Building frontend interfaces using React.js',
      'Developing backend services using Node.js and Express.js',
      'Working with MongoDB databases',
      'REST API integration and development',
      'Bug fixing and feature implementation',
      'Team collaboration and project development',
    ],
  },
];

const colorMap = {
  primary: {
    bg: 'bg-primary-500/20',
    text: 'text-primary-400',
    border: 'border-primary-500/40',
    glow: 'hover:shadow-glow-emerald',
    dot: 'bg-primary-500',
    tag: 'bg-primary-500/20 text-primary-300',
    line: 'from-primary-500',
  },
  cyan: {
    bg: 'bg-cyan-500/20',
    text: 'text-cyan-400',
    border: 'border-cyan-500/40',
    glow: 'hover:shadow-glow-cyan',
    dot: 'bg-cyan-400',
    tag: 'bg-cyan-500/20 text-cyan-300',
    line: 'from-cyan-500',
  },
};

export default function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="experience" className="min-h-screen flex items-center justify-center py-20">
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
            WHERE I'VE WORKED
          </motion.p>
          <motion.h2
            className="text-4xl sm:text-5xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <span className="text-white">Professional </span>
            <span className="gradient-text">Experience</span>
          </motion.h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical timeline line */}
          <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 hidden sm:block">
            <motion.div
              className="w-full bg-gradient-to-b from-primary-500 via-cyan-500 to-transparent rounded-full"
              initial={{ height: 0 }}
              animate={isInView ? { height: '100%' } : {}}
              transition={{ duration: 1.5, delay: 0.4, ease: 'easeInOut' }}
              style={{ originY: 0 }}
            />
          </div>

          <div className="space-y-10">
            {experiences.map((exp, index) => {
              const colors = colorMap[exp.color as keyof typeof colorMap];
              return (
                <div key={exp.company} className="relative">
                  {/* Timeline dot */}
                  <motion.div
                    className={`absolute left-1 sm:left-5 top-8 w-5 h-5 rounded-full ${colors.dot} border-2 border-dark-900 hidden sm:flex items-center justify-center z-10`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ delay: 0.5 + index * 0.3, type: 'spring', stiffness: 200 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-dark-900" />
                  </motion.div>

                  <motion.div
                    className={`sm:ml-20 glass-card border ${colors.border} ${colors.glow} transition-all duration-400 group relative overflow-hidden`}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.4 + index * 0.25, type: 'spring', stiffness: 80 }}
                    whileHover={{ scale: 1.01, y: -4 }}
                  >
                    {/* Glow background */}
                    <div className={`absolute top-0 right-0 w-40 h-40 ${colors.bg} rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity`} />

                    <div className="relative p-6 sm:p-8">
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                        <div className="flex items-start gap-4">
                          <div className={`w-14 h-14 rounded-2xl ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                            <Briefcase className={`w-7 h-7 ${colors.text}`} />
                          </div>
                          <div>
                            <h3 className={`text-xl font-bold text-white group-hover:${colors.text} transition-colors`}>
                              {exp.role}
                            </h3>
                            <p className={`${colors.text} font-semibold text-base`}>{exp.company}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 sm:flex-col sm:items-end">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-400 text-sm">{exp.duration}</span>
                          </div>
                          <span className={`text-xs px-3 py-1 rounded-full ${colors.tag} w-fit`}>
                            {exp.type}
                          </span>
                        </div>
                      </div>

                      {/* Responsibilities */}
                      <div className="grid sm:grid-cols-2 gap-2">
                        {exp.responsibilities.map((item, i) => (
                          <motion.div
                            key={i}
                            className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                            initial={{ opacity: 0, x: 15 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.6 + index * 0.25 + i * 0.05 }}
                          >
                            <ChevronRight className={`w-4 h-4 ${colors.text} flex-shrink-0 mt-0.5`} />
                            <span className="text-gray-300 text-sm leading-snug">{item}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
