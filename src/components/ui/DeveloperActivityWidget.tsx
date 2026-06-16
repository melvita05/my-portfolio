import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Rocket, Sparkles, Coffee, Zap, Heart } from 'lucide-react';

const activities = [
  { icon: Code, text: 'Building Projects...', color: 'primary' },
  { icon: Rocket, text: 'Learning New Technologies...', color: 'cyan' },
  { icon: Sparkles, text: 'Available For Opportunities...', color: 'accent' },
  { icon: Coffee, text: 'Crafting Clean Code...', color: 'primary' },
  { icon: Zap, text: 'Optimizing Performance...', color: 'cyan' },
  { icon: Heart, text: 'Creating Great UX...', color: 'accent' },
];

export default function DeveloperActivityWidget() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % activities.length);
        setIsVisible(true);
      }, 300);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const current = activities[currentIndex];
  const Icon = current.icon;

  const colorClasses = {
    primary: 'text-primary-400 bg-primary-500/20 border-primary-500/30',
    cyan: 'text-cyan-400 bg-cyan-500/20 border-cyan-500/30',
    accent: 'text-accent-teal bg-accent-teal/20 border-accent-teal/30',
  };

  return (
    <motion.div
      className="fixed bottom-6 left-6 z-40 hidden sm:block"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 2 }}
    >
      <motion.div
        className={`flex items-center gap-3 px-4 py-2.5 rounded-full border backdrop-blur-md ${colorClasses[current.color as keyof typeof colorClasses]}`}
        whileHover={{ scale: 1.05 }}
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Icon className="w-4 h-4" />
        </motion.div>

        <AnimatePresence mode="wait">
          {isVisible && (
            <motion.span
              key={current.text}
              className="text-sm font-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {current.text}
            </motion.span>
          )}
        </AnimatePresence>

        {/* Animated dot */}
        <motion.div
          className={`w-2 h-2 rounded-full ${current.color === 'primary' ? 'bg-primary-400' : current.color === 'cyan' ? 'bg-cyan-400' : 'bg-accent-teal'}`}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [1, 0.6, 1],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </motion.div>
  );
}
