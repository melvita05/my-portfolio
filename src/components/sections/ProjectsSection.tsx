import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import Tilt from 'react-parallax-tilt';

const projects = [
  {
    title: 'ORGANEASE',
    subtitle: 'Organ donation management system connecting donors with hospitals',
    tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
    image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=600',
    Github: 'https://github.com/yourusername/organease',
    live: 'https://organease.vercel.app',
    color: 'primary',
  },
  {
    title: 'College Event Management',
    subtitle: 'Event listing & registration platform with admin dashboard',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=600',
    Github: 'https://github.com/yourusername/event-management',
    live: 'https://eventmanagement.vercel.app',
    color: 'cyan',
  },
];

const colorClasses = {
  primary: {
    border: 'hover:border-primary-500/40',
    tag: 'tech-badge tech-badge-primary',
    text: 'text-primary-400',
    glow: 'shadow-glow-emerald',
  },
  cyan: {
    border: 'hover:border-cyan-500/40',
    tag: 'tech-badge tech-badge-cyan',
    text: 'text-cyan-400',
    glow: 'shadow-glow-cyan',
  },
};

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
  id="projects"
  className="py-16 lg:py-24"
>
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
            WHAT I'VE BUILT
          </motion.p>
          <motion.h2
            className="text-4xl sm:text-5xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <span className="text-white">My </span>
            <span className="gradient-text">Projects</span>
          </motion.h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {projects.map((project, projectIndex) => {
            const colors = colorClasses[project.color as keyof typeof colorClasses];

            // Calculate parallax offset based on mouse position
            const offsetX = (mousePos.x - 0.5) * (projectIndex === 0 ? 10 : -10);
            const offsetY = (mousePos.y - 0.5) * 8;

            return (
              <Tilt
  glareEnable={true}
  glareMaxOpacity={0.15}
  scale={1.03}
  tiltMaxAngleX={10}
  tiltMaxAngleY={10}
>
  <motion.div
  key={project.title}
  className="group relative perspective-1000"
  initial={{ opacity: 0, y: 60, rotateX: -5 }}
  animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
  whileHover={{
    rotateY: 8,
    rotateX: -5,
    scale: 1.02,
  }}
  transition={{ duration: 0.6, delay: 0.4 + projectIndex * 0.2 }}
  style={{
    transform: `translateX(${offsetX}px) translateY(${offsetY}px)`,
    transformStyle: 'preserve-3d',
  }}
>
                {/* Floating animation container */}
                <motion.div
                  className="relative"
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 4 + projectIndex,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  {/* Glow effect behind card */}
                  <motion.div
                    className={`absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${colors.glow}`}
                    style={{ filter: 'blur(20px)' }}
                  />

                  <div className={`glass-card overflow-hidden ${colors.border} transition-all duration-500 h-full flex flex-col relative backdrop-blur-xl`}>
                    {/* Animated gradient border on hover */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(135deg, rgba(0,217,165,0.1), rgba(56,189,248,0.1))`,
                      }}
                    />

                    <div className="relative h-44 overflow-hidden flex-shrink-0">
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent" />

                      {/* Floating particles overlay */}
                      <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-primary-400/50 rounded-full"
                            initial={{ y: 100, x: `${20 + i * 30}%`, opacity: 0 }}
                            animate={{
                              y: -20,
                              opacity: [0, 0.8, 0],
                            }}
                            transition={{
                              duration: 3 + i,
                              repeat: Infinity,
                              delay: i * 0.5,
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-1 relative">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <motion.h3
                            className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors"
                            layoutId={`project-title-${projectIndex}`}
                          >
                            {project.title}
                          </motion.h3>
                          <p className="text-gray-400 text-sm mt-1">{project.subtitle}</p>
                        </div>
                        <span className={`text-xs px-3 py-1 rounded-full bg-primary-500/15 ${colors.text} border border-primary-500/30`}>
                          MERN Stack
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-5 mt-auto">
                        {project.tech.map((tech, i) => (
                          <motion.span
                            key={tech}
                            className={colors.tag}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: 0.5 + i * 0.05 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>

                      <div className="flex gap-3 pt-4 border-t border-white/10">
                        <motion.button
                          className="neon-button flex items-center gap-2 text-white text-sm py-2 px-4"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Github className="w-4 h-4" />
                          Code
                        </motion.button>
                        <motion.button
                          className="neon-button-outline flex items-center gap-2 text-white text-sm py-2 px-4"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live Demo
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
              </Tilt>
            );
          })}
        </div>
      </div>
    </section>
  );
}
