import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform  } from 'framer-motion';
import { Briefcase, Calendar, ChevronRight } from 'lucide-react';

type ExperienceColor = 'primary' | 'cyan';

type Experience = {
  role: string;
  company: string;
  duration: string;
  type: string;
  color: ExperienceColor;
  responsibilities: string[];
};

const experiences: Experience[] = [
  {
    role: 'Full Stack Developer Intern',
    company: 'Zephyr Technologies & Solutions Pvt. Ltd.',
    duration: 'May 2026 – Present',
    type: 'Internship',
    color: 'cyan',
    responsibilities: [
      'Developing and maintaining full-stack web applications',
      'Building responsive user interfaces using React.js',
      'Developing backend services using Node.js and Express.js',
      'Working with MongoDB databases for data management',
      'Integrating REST APIs for seamless communication',
      'Testing, debugging, and implementing new features',
      'Collaborating with development teams on real-world projects',
    ],
  },
  {
    role: 'MERN Stack Developer Intern',
    company: 'Codelab System',
    duration: 'Aug 2024 – Nov 2024',
    type: 'Internship',
    color: 'primary',
    responsibilities: [
      'Developed web applications using MongoDB, Express.js, React.js, and Node.js',
      'Implemented authentication and authorization systems',
      'Built REST APIs and performed CRUD operations',
      'Created responsive user interfaces using React.js',
      'Integrated frontend with backend services',
      'Gained hands-on experience in full-stack development',
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
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // 🔥 scroll progress for line animation
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
<section id="experience" ref={ref} className="relative py-16 sm:py-28 mt-10 sm:mt-20">
        <div className="container mx-auto px-4 lg:px-8">

        {/* HEADER */}
        <motion.div
          className="text-center mb-28"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary-400 font-mono text-sm mb-2">
            WHERE I'VE WORKED
          </p>

          <h2 className="text-4xl sm:text-5xl font-bold">
            <span className="text-white">Professional </span>
            <span className="gradient-text">Experience</span>
          </h2>
        </motion.div>

        {/* TIMELINE WRAPPER */}
        <div className="relative max-w-4xl mx-auto">

          {/* 🌈 ANIMATED MAIN LINE */}
          <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-[2px] hidden sm:block">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-cyan-400 via-primary-500 to-transparent rounded-full shadow-[0_0_20px_rgba(34,211,238,0.4)]"
            />
          </div>

          <div className="space-y-8 sm:space-y-16">
            {experiences.map((exp, index) => {
const colors = colorMap[exp.color as keyof typeof colorMap];
              return (
                <motion.div
                  key={exp.company}
                  initial={{ opacity: 0, y: 60, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative"
                >

                  {/* 🔵 PULSE DOT */}
                  <motion.div
                    className={`absolute left-1 sm:left-5 top-10 w-4 h-4 rounded-full ${colors.dot} hidden sm:flex`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  >
                    <motion.span
                      className="absolute inset-0 rounded-full bg-current opacity-40"
                      animate={{ scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>

                  {/* CARD */}
                  <motion.div
                    className={`sm:ml-20 glass-card border ${colors.border} relative overflow-hidden`}
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ type: "spring", stiffness: 120 }}
                  >

                    {/* moving glow */}
                    <motion.div
                      className={`absolute -top-20 -right-20 w-60 h-60 ${colors.bg} blur-3xl opacity-30`}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />

                    <div className="relative p-4 sm:p-8">

                      {/* HEADER */}
                      <div className="flex justify-between flex-wrap gap-4 mb-6">

                        <div className="flex gap-4">
                          <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center`}>
                            <Briefcase className={`w-6 h-6 ${colors.text}`} />
                          </div>

                          <div>
                            <h3 className="text-lg sm:text-xl font-bold text-white">
                              {exp.role}
                            </h3>
                            <p className={`${colors.text} font-medium`}>
                              {exp.company}
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-gray-400 text-sm flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {exp.duration}
                          </p>
                          <span className={`text-xs px-3 py-1 rounded-full ${colors.tag} inline-block mt-2`}>
                            {exp.type}
                          </span>
                        </div>
                      </div>

                      {/* RESPONSIBILITIES */}
                      <div className="grid sm:grid-cols-2 gap-3">
                        {exp.responsibilities.map((item, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="flex items-start gap-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition"
                          >
                            <ChevronRight className={`w-4 h-4 ${colors.text} mt-0.5`} />
                            <span className="text-gray-300 text-sm">
                              {item}
                            </span>
                          </motion.div>
                        ))}
                      </div>

                    </div>
                  </motion.div>

                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}