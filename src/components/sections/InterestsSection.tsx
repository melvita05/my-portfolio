import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Music, UtensilsCrossed, Map, Users, Mic } from 'lucide-react';

const interests = [
  {
    name: 'Dancing',
    icon: Music,
    description: 'Expressing creativity through the art of dance',
    color: 'primary',
  },
  {
    name: 'Cooking',
    icon: UtensilsCrossed,
    description: 'Experimenting with flavors and creating new dishes',
    color: 'blue',
  },
  {
    name: 'Traveling',
    icon: Map,
    description: 'Exploring new places and experiencing different cultures',
    color: 'cyan',
  },
];

const extraCurricular = [
  {
    title: 'Volunteer – Cantech Inter College Fest',
    org: 'Canara College, Mangalore',
    description: 'Volunteered for the Cantech Inter College Fest, assisting with event coordination and participant management.',
    icon: Users,
    color: 'primary',
  },
  {
    title: 'Conferences and Seminars',
    org: 'Canara College, Mangalore',
    description: 'Attended various conferences and seminars to stay updated with the latest trends in technology and computer science.',
    icon: Mic,
    color: 'blue',
  },
];

const colorClasses = {
  primary: { bg: 'bg-primary-500/20', text: 'text-primary-400', border: 'hover:border-primary-500/50' },
  blue: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'hover:border-blue-500/50' },
  cyan: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'hover:border-cyan-500/50' },
};

export default function InterestsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="interests" className="py-20">
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
            BEYOND CODE
          </motion.p>
          <motion.h2
            className="text-4xl sm:text-5xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <span className="text-white">Interests & </span>
            <span className="gradient-text">Activities</span>
          </motion.h2>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
              <div className="w-1 h-6 bg-gradient-to-b from-primary-400 to-blue-500 rounded-full" />
              Personal Interests
            </h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {interests.map((item, i) => (
                <motion.div
                  key={item.name}
                  className={`glass-card text-center ${colorClasses[item.color as keyof typeof colorClasses].border} transition-all duration-300`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <div className={`w-14 h-14 mx-auto rounded-2xl ${colorClasses[item.color as keyof typeof colorClasses].bg} flex items-center justify-center mb-4`}>
                    <item.icon className={`w-7 h-7 ${colorClasses[item.color as keyof typeof colorClasses].text}`} />
                  </div>
                  <h4 className="text-white font-semibold text-lg mb-2">{item.name}</h4>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
              <div className="w-1 h-6 bg-gradient-to-b from-primary-400 to-blue-500 rounded-full" />
              Extra Curricular
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {extraCurricular.map((item, i) => (
                <motion.div
                  key={item.title}
                  className={`glass-card ${colorClasses[item.color as keyof typeof colorClasses].border} transition-all duration-300`}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.7 + i * 0.15 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex gap-4 items-start">
                    <div className={`w-11 h-11 rounded-xl ${colorClasses[item.color as keyof typeof colorClasses].bg} flex items-center justify-center flex-shrink-0`}>
                      <item.icon className={`w-5 h-5 ${colorClasses[item.color as keyof typeof colorClasses].text}`} />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                      <p className={`text-sm ${colorClasses[item.color as keyof typeof colorClasses].text} mb-2`}>
                        {item.org}
                      </p>
                      <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
