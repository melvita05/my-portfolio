import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, Building, CheckCircle } from 'lucide-react';

const certifications = [
  {
    title: 'Data Analytics Using Power BI',
    issuer: 'Codelab System',
    description: 'Hands-on training in data analysis and visualization using Microsoft Power BI for business intelligence.',
    color: 'blue',
    category: 'Data Analytics',
  },
  {
    title: 'Big Data',
    issuer: 'Infosys Springboard',
    description: 'Foundational concepts of big data technologies, processing frameworks, and real-world applications.',
    color: 'cyan',
    category: 'Big Data',
  },
  {
    title: 'Generative AI for All',
    issuer: 'Infosys Springboard',
    description: 'Introduction to generative AI concepts, tools, and responsible use in modern applications.',
    color: 'pink',
    category: 'Artificial Intelligence',
  },
  {
    title: 'Introduction to Cybersecurity',
    issuer: 'CISCO',
    description: 'Foundational cybersecurity concepts including threats, network defenses, and security best practices.',
    color: 'green',
    category: 'Cybersecurity',
  },
];

const colorClasses = {
  blue: {
    bg: 'bg-blue-500/20',
    text: 'text-blue-400',
    border: 'border-blue-500/40',
    tag: 'bg-blue-500/10 text-blue-300',
    dot: 'border-blue-500/60',
  },
  cyan: {
    bg: 'bg-cyan-500/20',
    text: 'text-cyan-400',
    border: 'border-cyan-500/40',
    tag: 'bg-cyan-500/10 text-cyan-300',
    dot: 'border-cyan-500/60',
  },
  pink: {
    bg: 'bg-pink-500/20',
    text: 'text-pink-400',
    border: 'border-pink-500/40',
    tag: 'bg-pink-500/10 text-pink-300',
    dot: 'border-pink-500/60',
  },
  green: {
    bg: 'bg-green-500/20',
    text: 'text-green-400',
    border: 'border-green-500/40',
    tag: 'bg-green-500/10 text-green-300',
    dot: 'border-green-500/60',
  },
};

export default function CertificationsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="certifications" className="min-h-screen flex items-center justify-center py-20">
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
            CERTIFICATE COURSES
          </motion.p>
          <motion.h2
            className="text-4xl sm:text-5xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <span className="text-white">My </span>
            <span className="gradient-text">Certifications</span>
          </motion.h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-4 lg:left-8 top-0 w-0.5 h-full hidden sm:block">
            <motion.div
              className="w-full bg-gradient-to-b from-blue-500 via-cyan-500 via-pink-500 to-transparent rounded-full"
              initial={{ height: 0 }}
              animate={isInView ? { height: '100%' } : {}}
              transition={{ duration: 1.2, delay: 0.4 }}
              style={{ originY: 0 }}
            />
          </div>

          {certifications.map((cert, index) => {
            const colors = colorClasses[cert.color as keyof typeof colorClasses];
            return (
              <motion.div
                key={cert.title}
                className="relative pl-0 sm:pl-20 pb-8 last:pb-0"
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.12 }}
              >
                <motion.div
                  className={`hidden sm:flex absolute left-1 lg:left-5 top-5 w-6 h-6 rounded-full ${colors.bg} border-2 ${colors.dot} items-center justify-center z-10`}
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.12, type: 'spring' }}
                >
                  <CheckCircle className={`w-3.5 h-3.5 ${colors.text}`} />
                </motion.div>

                <motion.div
                  className={`glass-card border ${colors.border} hover:bg-white/10 transition-all duration-300`}
                  whileHover={{ scale: 1.01, x: 6 }}
                >
                  <div className="flex flex-col sm:flex-row gap-4 items-start">
                    <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                      <Award className={`w-6 h-6 ${colors.text}`} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                        <h3 className="text-lg font-bold text-white">{cert.title}</h3>
                        <span className={`text-xs px-2.5 py-1 rounded-full ${colors.tag} flex-shrink-0 w-fit`}>
                          {cert.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mb-2">
                        <Building className="w-4 h-4 text-gray-500 flex-shrink-0" />
                        <span className={`text-sm font-medium ${colors.text}`}>{cert.issuer}</span>
                      </div>

                      <p className="text-gray-400 text-sm leading-relaxed">{cert.description}</p>
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
