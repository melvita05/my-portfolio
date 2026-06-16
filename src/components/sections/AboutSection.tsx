import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Code2, Briefcase, Layers } from 'lucide-react';

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const highlights = [
    {
      icon: GraduationCap,
      title: 'MCA Student',
      description: 'Pursuing MCA at Canara College, Mangalore',
      color: 'primary',
    },
    {
      icon: Code2,
      title: 'MERN Stack',
      description: 'Full-stack web application development',
      color: 'blue',
    },
    {
      icon: Briefcase,
      title: 'Experienced',
      description: 'Intern at Codelab & Developer at Zephyr',
      color: 'cyan',
    },
    {
      icon: Layers,
      title: 'Full-Stack',
      description: 'React, Node, Express & MongoDB',
      color: 'pink',
    },
  ];

  const colorMap: Record<string, string> = {
    primary: 'bg-primary-500/20 text-primary-400',
    blue: 'bg-blue-500/20 text-blue-400',
    cyan: 'bg-cyan-500/20 text-cyan-400',
    pink: 'bg-pink-500/20 text-pink-400',
  };

  return (
    <section id="about" className="min-h-screen flex items-center justify-center py-20">
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
            GET TO KNOW ME
          </motion.p>
          <motion.h2
            className="text-4xl sm:text-5xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <span className="text-white">About </span>
            <span className="gradient-text">Me</span>
          </motion.h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          <motion.div
            className="glass-card p-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-10 bg-gradient-to-b from-primary-400 to-blue-500 rounded-full" />
              <h3 className="text-xl font-semibold text-white">About Me</h3>
            </div>

            <p className="text-gray-300 text-lg leading-relaxed mb-5">
              MCA Student and MERN Stack Developer passionate about building scalable web applications and learning modern technologies.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Experienced in React.js, Node.js, Express.js, MongoDB, REST APIs, and full-stack development through industry experience and real-world projects.
            </p>

            <div className="mt-6 pt-6 border-t border-white/10 grid sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <span className="text-primary-400">Email:</span>
                <a href="mailto:primald39@gmail.com" className="hover:text-primary-400 transition-colors truncate">
                  primald39@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <span className="text-primary-400">Location:</span>
                <span>Mangalore, Karnataka</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <span className="text-primary-400">Phone:</span>
                <a href="tel:+917892762829" className="hover:text-primary-400 transition-colors">+91 7892762829</a>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <span className="text-primary-400">Status:</span>
                <span className="text-green-400">Open to Opportunities</span>
              </div>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                className="glass-card p-6 group hover:border-primary-500/50 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
              >
                <div className={`w-12 h-12 rounded-xl ${colorMap[item.color]} flex items-center justify-center mb-4`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
