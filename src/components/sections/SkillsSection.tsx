import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Globe, Server, Database, Settings, CheckCircle, Building } from 'lucide-react';
import TechConstellation from '../skills/TechConstellation';
import CircularSkills from "../skills/CircularSkill";



// ✅ FIXED: renamed properly
const circularSkills = [
  { name: 'React', percent: 85, color: '#22d3ee' },
  { name: 'Node.js', percent: 80, color: '#38bdf8' },
  { name: 'MongoDB', percent: 75, color: '#2dd4bf' },
  { name: 'Express', percent: 78, color: '#60a5fa' },
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
const colorMap: Record<string, any> = {
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

const CircularSkill = ({ name, percent, color }: any) => {
  const radius = 50;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = 2 * Math.PI * normalizedRadius;

  const strokeDashoffset =
    circumference - (percent / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg height={120} width={120}>
        {/* background circle */}
        <circle
          stroke="#1f2937"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={60}
          cy={60}
        />

        {/* progress circle */}
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          r={normalizedRadius}
          cx={60}
          cy={60}
          style={{
            transition: 'stroke-dashoffset 1.2s ease-in-out',
          }}
        />
      </svg>

      <div className="text-center -mt-16">
        <p className="text-white font-semibold">{name}</p>
        <p className="text-cyan-400">{percent}%</p>
      </div>
    </div>
  );
};

export default function SkillsSection() {
  const skillsRef = useRef(null);
  const certsRef = useRef(null);

  const skillsInView = useInView(skillsRef, { once: true, margin: '-100px' });
  const certsInView = useInView(certsRef, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="py-20 min-h-screen">
      <div className="container mx-auto px-4 lg:px-8">

        {/* HEADER */}
        <motion.div ref={skillsRef} className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={skillsInView ? { opacity: 1, y: 0 } : {}}
        >
          <p className="text-primary-400 font-mono text-sm mb-2">
            WHAT I WORK WITH
          </p>

          <h2 className="text-5xl sm:text-6xl font-extrabold">
            <span className="text-white">My </span>
            <span className="gradient-text">Skills</span>
          </h2>
        </motion.div>

        {/* TECH CONSTELLATION */}
        <TechConstellation isInView={skillsInView} />
        {/* CIRCULAR SKILLS SECTION */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-10 mt-16 mb-20">
  {circularSkills.map((skill, i) => (
    <motion.div
      key={skill.name}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1 }}
    >
      <CircularSkill {...skill} />
    </motion.div>
  ))}
</div>

        {/* SKILLS */}
        

        {/* CERTIFICATIONS */}
        <motion.div ref={certsRef} className="text-center mb-10">
          <h3 className="text-2xl font-bold">
            <span className="text-white">Certificate </span>
            <span className="gradient-text">Courses</span>
          </h3>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.title}
              className={`glass-card ${colorMap[cert.color].border}`}
              initial={{ opacity: 0, y: 40 }}
              animate={certsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10, scale: 1.05 }}
            >
              <CheckCircle className={colorMap[cert.color].check} />

              <h4 className="text-white font-semibold text-sm mt-3">
                {cert.title}
              </h4>

              <div className="flex items-center gap-2 mt-3">
                <Building className={colorMap[cert.color].text} />
                <span className={`text-xs ${colorMap[cert.color].text}`}>
                  {cert.issuer}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
      <CircularSkills />
    </section>
  );
}