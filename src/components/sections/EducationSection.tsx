import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, BookOpen, Star, Calendar } from 'lucide-react';

const education = [
  {
    degree: 'Master of Computer Applications (MCA)',
    college: 'Canara College, Mangalore',
    status: 'Pursuing',
    cgpa: null,
    icon: GraduationCap,
    color: 'primary',
    details: [
      'Currently pursuing MCA with focus on modern web technologies',
      'Actively building full-stack web applications',
      'Learning advanced computer science concepts',
    ],
  },
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    college: 'Shree Devi College Of Information Science, Mangalore',
    status: '2024',
    cgpa: '8.28',
    icon: BookOpen,
    color: 'blue',
    details: [
      'Secured CGPA of 8.28',
      'Strong foundation in computer science fundamentals',
      'Completed coursework in web development and databases',
    ],
  },
];

const colorClasses = {
  primary: {
    bg: 'bg-primary-500/20',
    text: 'text-primary-400',
    border: 'border-primary-500/30',
    pill: 'bg-primary-500/20 text-primary-300',
    bar: 'from-primary-500 to-primary-400',
  },
  blue: {
    bg: 'bg-blue-500/20',
    text: 'text-blue-400',
    border: 'border-blue-500/30',
    pill: 'bg-blue-500/20 text-blue-300',
    bar: 'from-blue-500 to-blue-400',
  },
};

export default function EducationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="education" className="min-h-screen flex items-center justify-center py-20">
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
            ACADEMIC BACKGROUND
          </motion.p>
          <motion.h2
            className="text-4xl sm:text-5xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <span className="text-white">My </span>
            <span className="gradient-text">Education</span>
          </motion.h2>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {education.map((edu, index) => {
            const colors = colorClasses[edu.color as keyof typeof colorClasses];
            return (
              <motion.div
                key={edu.degree}
                className="relative"
                initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.4 + index * 0.2 }}
              >
                <motion.div
                  className={`glass-card p-6 sm:p-8 border ${colors.border} hover:bg-white/10 transition-all duration-300 relative overflow-hidden`}
                  whileHover={{ scale: 1.01, y: -4 }}
                >
                  <div className={`absolute top-0 right-0 w-48 h-48 ${colors.bg} rounded-full blur-3xl opacity-30`} />

                  <div className="relative flex flex-col sm:flex-row gap-6">
                    <div className={`w-16 h-16 rounded-2xl ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                      <edu.icon className={`w-8 h-8 ${colors.text}`} />
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">{edu.degree}</h3>
                          <p className={`${colors.text} font-medium`}>{edu.college}</p>
                        </div>

                        <div className="flex flex-col items-start sm:items-end gap-2 mt-2 sm:mt-0">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className={`text-sm px-3 py-1 rounded-full ${colors.pill}`}>
                              {edu.status}
                            </span>
                          </div>
                          {edu.cgpa && (
                            <div className="flex items-center gap-2">
                              <Star className="w-4 h-4 text-yellow-400" />
                              <span className="text-yellow-400 font-semibold">CGPA: {edu.cgpa}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2 mt-4">
                        {edu.details.map((detail, i) => (
                          <motion.div
                            key={i}
                            className="flex items-start gap-3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.6 + index * 0.2 + i * 0.1 }}
                          >
                            <div className={`w-1.5 h-1.5 rounded-full ${colors.text} mt-2 flex-shrink-0`} style={{ backgroundColor: 'currentColor' }} />
                            <p className="text-gray-400 text-sm">{detail}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
