import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Globe, Server, Database, Settings, Award, CheckCircle, Building } from 'lucide-react';
import TechConstellation from '../skills/TechConstellation';

const skillCategories = [
  {
    title: 'Frontend',
    icon: Globe,
    skills: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Bootstrap'],
    color: 'primary',
  },
  {
    title: 'Backend',
    icon: Server,
    skills: ['Node.js', 'Express.js'],
    color: 'cyan',
  },
  {
    title: 'Database',
    icon: Database,
    skills: ['MongoDB'],
    color: 'accent',
  },
  {
    title: 'Tools',
    icon: Settings,
    skills: ['Git', 'GitHub', 'VS Code', 'Postman'],
    color: 'sky',
  },
];

const certifications = [
  {
    title: 'Data Analytics Using Power BI',
    issuer: 'Codelab System',
    color: 'cyan',
  },
  {
    title: 'Big Data',
    issuer: 'Infosys Springboard',
    color: 'sky',
  },
  {
    title: 'Generative AI for All',
    issuer: 'Infosys Springboard',
    color: 'primary',
  },
  {
    title: 'Introduction to Cybersecurity',
    issuer: 'CISCO',
    color: 'accent',
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string; tag: string; check: string }> = {
  primary: {
    bg: 'bg-primary-500/20',
    border: 'hover:border-primary-500/50',
    text: 'text-primary-400',
    tag: 'tech-badge tech-badge-primary',
    check: 'text-primary-400',
  },
  cyan: {
    bg: 'bg-cyan-500/20',
    border: 'hover:border-cyan-500/50',
    text: 'text-cyan-400',
    tag: 'tech-badge tech-badge-cyan',
    check: 'text-cyan-400',
  },
  accent: {
    bg: 'bg-accent-teal/20',
    border: 'hover:border-accent-teal/50',
    text: 'text-accent-teal',
    tag: 'bg-accent-teal/15 text-teal-300 border-accent-teal/30',
    check: 'text-accent-teal',
  },
  sky: {
    bg: 'bg-accent-sky/20',
    border: 'hover:border-accent-sky/50',
    text: 'text-accent-sky',
    tag: 'bg-accent-sky/15 text-sky-300 border-accent-sky/30',
    check: 'text-accent-sky',
  },
};

export default function SkillsSection() {
  const skillsRef = useRef(null);
  const certsRef = useRef(null);
  const skillsInView = useInView(skillsRef, { once: true, margin: '-100px' });
  const certsInView = useInView(certsRef, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="py-20 min-h-screen">
      <div className="container mx-auto px-4 lg:px-8">

        {/* Skills heading */}
        <motion.div
          ref={skillsRef}
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={skillsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.p
            className="text-primary-400 font-mono text-sm mb-2"
            initial={{ opacity: 0 }}
            animate={skillsInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            WHAT I WORK WITH
          </motion.p>
          <motion.h2
            className="text-4xl sm:text-5xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={skillsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <span className="text-white">My </span>
            <span className="gradient-text">Skills</span>
          </motion.h2>
        </motion.div>

        {/* Tech Constellation - Interactive visualization */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={skillsInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
        >
          <TechConstellation isInView={skillsInView} />
        </motion.div>

        {/* Skill cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto mb-20">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              className={`glass-card ${colorMap[category.color].border} transition-all duration-300`}
              initial={{ opacity: 0, y: 50, x: catIndex % 2 === 0 ? -30 : 30 }}
              animate={skillsInView ? { opacity: 1, y: 0, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + catIndex * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className={`w-12 h-12 rounded-xl ${colorMap[category.color].bg} flex items-center justify-center mb-4`}>
                <category.icon className={`w-6 h-6 ${colorMap[category.color].text}`} />
              </div>

              <h3 className={`font-semibold text-sm uppercase tracking-wider mb-4 ${colorMap[category.color].text}`}>
                {category.title}
              </h3>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, si) => (
                  <motion.span
                    key={skill}
                    className={`px-3 py-1.5 text-sm rounded-lg border font-mono ${colorMap[category.color].tag}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={skillsInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.25, delay: 0.6 + catIndex * 0.1 + si * 0.05 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications sub-section */}
        <motion.div
          ref={certsRef}
          className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={certsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-3 mb-3"
            initial={{ opacity: 0 }}
            animate={certsInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary-500/60" />
            <Award className="w-5 h-5 text-primary-400" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary-500/60" />
          </motion.div>
          <motion.h3
            className="text-2xl sm:text-3xl font-bold"
            initial={{ opacity: 0, y: 16 }}
            animate={certsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25 }}
          >
            <span className="text-white">Certificate </span>
            <span className="gradient-text">Courses</span>
          </motion.h3>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.title}
              className={`glass-card ${colorMap[cert.color].border} transition-all duration-300 flex flex-col justify-between`}
              initial={{ opacity: 0, y: 40 }}
              animate={certsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
            >
              <div>
                <div className={`w-11 h-11 rounded-xl ${colorMap[cert.color].bg} flex items-center justify-center mb-4`}>
                  <CheckCircle className={`w-5 h-5 ${colorMap[cert.color].check}`} />
                </div>
                <h4 className="text-white font-semibold text-sm leading-snug mb-3">{cert.title}</h4>
              </div>
              <div className={`flex items-center gap-1.5 mt-auto`}>
                <Building className={`w-3.5 h-3.5 ${colorMap[cert.color].text} flex-shrink-0`} />
                <span className={`text-xs font-medium ${colorMap[cert.color].text}`}>{cert.issuer}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
