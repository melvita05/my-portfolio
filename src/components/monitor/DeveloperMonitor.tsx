import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Power, Code2, Terminal, Briefcase } from 'lucide-react';

const CODE_LINES = [
  'const developer = {',
  '  name: "Primal Melvita Dsouza",',
  '  role: "MERN Stack Developer",',
  '  experience: [',
  '    {',
  '      company: "Codelab System",',
  '      role: "MERN Stack Intern",',
  '      duration: "3 Months"',
  '    },',
  '    {',
  '      company: "Zephyr Technologies",',
  '      role: "Full Stack Developer",',
  '      duration: "3 Months"',
  '    }',
  '  ]',
  '};',
];

const TERMINAL_LINES = [
  { text: '$ git commit -m "Added Portfolio"', type: 'command' },
  { text: '✓ Commit successful', type: 'success' },

  { text: '$ npm run build', type: 'command' },
  { text: '✓ Build completed', type: 'success' },

  { text: '$ npm run deploy', type: 'command' },
  { text: '✓ Portfolio deployed', type: 'success' },
];

interface MonitorContentProps {
  section: string;
}

function CodeTypingAnimation() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);

  useEffect(() => {
    if (currentLine >= CODE_LINES.length) return;
    const line = CODE_LINES[currentLine];
    if (currentChar < line.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines(prev => {
          const newLines = [...prev];
          newLines[currentLine] = line.slice(0, currentChar + 1);
          return newLines;
        });
        setCurrentChar(prev => prev + 1);
      }, 22);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
        setCurrentChar(0);
      }, 60);
      return () => clearTimeout(timeout);
    }
  }, [currentLine, currentChar]);

  return (
    <div className="font-mono text-[10px] sm:text-xs overflow-hidden">
      {displayedLines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-green-400 leading-5"
        >
          <span className="text-gray-600 mr-2 select-none">{String(i + 1).padStart(2, ' ')}</span>
          {line.startsWith('  ') ? (
            <>
              <span className="text-gray-600">{line.match(/^\s+/)?.[0] ?? ''}</span>
              <span className="text-green-400">{line.trimStart()}</span>
            </>
          ) : (
            <span className="text-primary-300">{line}</span>
          )}
          {i === currentLine && currentChar < CODE_LINES[currentLine]?.length && (
            <span className="typing-cursor" />
          )}
        </motion.div>
      ))}
    </div>
  );
}

function TerminalAnimation() {
  const [displayedLines, setDisplayedLines] = useState<typeof TERMINAL_LINES>([]);
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    if (currentLine >= TERMINAL_LINES.length) return;
    const timeout = setTimeout(() => {
      setDisplayedLines(prev => [...prev, TERMINAL_LINES[currentLine]]);
      setCurrentLine(prev => prev + 1);
    }, currentLine === 0 ? 300 : 700);
    return () => clearTimeout(timeout);
  }, [currentLine]);

  return (
    <div className="font-mono text-xs sm:text-sm space-y-1">
      {displayedLines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${line.type === 'command' ? 'text-primary-400' : line.type === 'success' ? 'text-green-400' : 'text-gray-400'}`}
        >
          {line.text}
        </motion.div>
      ))}
    </div>
  );
}

function ProfileDisplay() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full py-4 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background aura effect */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="w-36 h-36 sm:w-44 sm:h-44 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0,217,165,0.15) 0%, rgba(56,189,248,0.1) 40%, transparent 70%)',
            filter: 'blur(20px)',
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Main profile container - 60% larger */}
      <motion.div
        className="relative"
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', duration: 1, bounce: 0.3 }}
      >
        {/* Outer rotating ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            width: '130%',
            height: '130%',
            left: '-15%',
            top: '-15%',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00D9A5" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#00D9A5" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke="url(#ringGradient)"
              strokeWidth="2"
              strokeDasharray="20 10"
            />
          </svg>
        </motion.div>

        {/* Glowing pulse ring */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '145%',
            height: '145%',
            left: '-22.5%',
            top: '-22.5%',
            background: 'transparent',
            boxShadow: '0 0 30px rgba(0,217,165,0.3), inset 0 0 30px rgba(56,189,248,0.2)',
          }}
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Secondary floating ring */}
        <motion.div
          className="absolute rounded-full border border-primary-400/30"
          style={{
            width: '160%',
            height: '160%',
            left: '-30%',
            top: '-30%',
          }}
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, -5, 0],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Profile image - 60% larger (was w-20 h-20, now ~w-32 h-32) */}
        <motion.div
          className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden"
          style={{
            boxShadow: '0 0 40px rgba(0,217,165,0.4), 0 0 80px rgba(56,189,248,0.2), inset 0 0 20px rgba(0,0,0,0.3)',
          }}
          animate={{
            boxShadow: [
              '0 0 40px rgba(0,217,165,0.4), 0 0 80px rgba(56,189,248,0.2)',
              '0 0 60px rgba(0,217,165,0.6), 0 0 100px rgba(56,189,248,0.3)',
              '0 0 40px rgba(0,217,165,0.4), 0 0 80px rgba(56,189,248,0.2)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Inner glow overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/20 via-transparent to-cyan-500/20 pointer-events-none z-10" />

          <motion.img
            src="https://images.pexels.com/photos/3783525/pexels-photo-3783525.jpeg?auto=compress&cs=tinysrgb&w=400"
            alt="Primal Melvita Dsouza"
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
          />
        </motion.div>
      </motion.div>

      {/* Name and title */}
      <motion.div
        className="mt-5 text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <motion.h2
          className="text-base sm:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-cyan-400 to-primary-400"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          PRIMAL MELVITA DSOUZA
        </motion.h2>
        <motion.p
          className="text-[10px] sm:text-xs text-gray-400 mt-1 tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          MERN STACK DEVELOPER
        </motion.p>
      </motion.div>

      {/* Compact tech badges */}
      <motion.div
        className="flex gap-1.5 mt-3 flex-wrap justify-center"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        {['React.js', 'Node.js', 'Express.js', 'MongoDB'].map((s, i) => (
          <motion.span
            key={s}
            className="px-2 py-0.5 bg-gradient-to-r from-primary-500/20 to-cyan-500/20 rounded-full text-primary-300 text-[9px] sm:text-[10px] border border-primary-500/20"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8 + i * 0.1, type: 'spring' }}
          >
            {s}
          </motion.span>
        ))}
      </motion.div>

      {/* Experience compact */}
      <motion.div
        className="w-full mt-4 px-2"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        <div className="flex gap-2 justify-center">
          {[
            { company: 'Codelab System', role: 'Intern' },
            { company: 'Zephyr Tech', role: 'Developer' },
          ].map((exp, i) => (
            <motion.div
              key={exp.company}
              className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 border border-white/10"
              initial={{ opacity: 0, x: i === 0 ? -10 : 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + i * 0.1 }}
            >
              <Briefcase className="w-2.5 h-2.5 text-primary-400" />
              <div className="text-[8px]">
                <span className="text-white font-medium">{exp.company}</span>
                <span className="text-gray-500 ml-1">{exp.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

function PowerOnAnimation() {
  return (
    <motion.div className="flex flex-col items-center justify-center h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div
        className="text-primary-500 mb-4"
        animate={{ textShadow: ['0 0 10px rgba(0,217,165,0.5)', '0 0 30px rgba(0,217,165,0.8)', '0 0 10px rgba(0,217,165,0.5)'] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <Power className="w-12 h-12" />
      </motion.div>
      <motion.p className="text-primary-400 font-mono" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}>
        Powering On...
      </motion.p>
    </motion.div>
  );
}

function DissolveParticles() {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 200,
    y: (Math.random() - 0.5) * 200,
    delay: Math.random() * 0.5,
    size: Math.random() * 6 + 2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute left-1/2 top-1/2 rounded-full bg-primary-400"
          style={{ width: p.size, height: p.size }}
          initial={{ x: p.x, y: p.y, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

function ExperienceDashboard() {
  const jobs = [
    { role: 'MERN Stack Intern', company: 'Codelab System', duration: '3 Months', color: 'text-primary-400' },
    { role: 'Full Stack Developer', company: 'Zephyr Technologies', duration: '3 Months', color: 'text-cyan-400' },
  ];

  return (
    <div className="p-2 sm:p-4 h-full flex flex-col justify-center">
      <motion.h3 className="text-primary-400 text-xs font-semibold text-center mb-3 uppercase tracking-wider" initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        Professional Experience
      </motion.h3>
      <div className="space-y-3">
        {jobs.map((job, i) => (
          <motion.div
            key={job.company}
            className="glass-card p-3 relative overflow-hidden"
            initial={{ x: i % 2 === 0 ? -40 : 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.2 + 0.2, type: 'spring', stiffness: 100 }}
          >
            <div className="flex items-center gap-2">
              <Briefcase className={`w-4 h-4 ${job.color} flex-shrink-0`} />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white truncate">{job.role}</p>
                <p className={`text-[10px] ${job.color}`}>{job.company}</p>
                <p className="text-[9px] text-gray-500">{job.duration}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SkillsVisualization() {
  const skills = [
    { name: 'React.js', level: 80, color: '#61DAFB' },
    { name: 'Node.js', level: 75, color: '#339933' },
    { name: 'MongoDB', level: 75, color: '#47A248' },
    { name: 'JavaScript', level: 80, color: '#F7DF1E' },
    { name: 'HTML/CSS', level: 85, color: '#E34F26' },
    { name: 'Express.js', level: 75, color: '#FFFFFF' },
  ];

  return (
    <div className="p-2 sm:p-4 h-full">
      <motion.h3 className="text-primary-400 text-xs font-semibold text-center mb-3 uppercase tracking-wider" initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        Tech Stack
      </motion.h3>
      <div className="space-y-2">
        {skills.map((skill, i) => (
          <motion.div key={skill.name} initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.08 }}>
            <div className="flex justify-between text-[9px] sm:text-[10px] mb-0.5">
              <span className="text-gray-300">{skill.name}</span>
            </div>
            <div className="h-1.5 bg-dark-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: skill.color }}
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 1, delay: i * 0.08 + 0.3 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ProjectShowcase() {
  return (
    <div className="p-2 sm:p-4 h-full flex flex-col justify-center">
      <motion.h3 className="text-primary-400 text-xs font-semibold text-center mb-4 uppercase tracking-wider" initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        Projects
      </motion.h3>
      <div className="space-y-3">
        {[
          { name: 'Organease', subtitle: 'Organ Donation System', tech: 'MERN Stack' },
          { name: 'Event Management', subtitle: 'College Event System', tech: 'Node.js + Express' },
        ].map((project, i) => (
          <motion.div key={project.name} className="glass-card p-3" initial={{ x: i % 2 === 0 ? -40 : 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.2 }}>
            <p className="text-xs font-semibold text-white">{project.name}</p>
            <p className="text-[9px] text-gray-400">{project.subtitle}</p>
            <span className="text-[9px] text-primary-300">{project.tech}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function TerminalInterface() {
  return (
    <div className="p-2 sm:p-4 h-full flex flex-col justify-center font-mono text-[10px] sm:text-xs">
      <motion.div className="text-green-400 mb-2" initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }}>
        {'>'} Ready for connection...
      </motion.div>
      <motion.div className="text-primary-400 mb-2" initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
        {'>'} primald39@gmail.com
      </motion.div>
      <motion.div className="text-gray-400 mb-3" initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
        {'>'} Mangalore, Karnataka
      </motion.div>
      <motion.div className="flex items-center text-gray-400" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
        <span className="text-primary-400 mr-2">$</span>
        <span>contact@primal:~</span>
        <span className="typing-cursor ml-1 w-1.5 h-3 sm:h-4" />
      </motion.div>
    </div>
  );
}

export default function DeveloperMonitor({ section }: MonitorContentProps) {
  const [phase, setPhase] = useState(0);
  const [showParticles, setShowParticles] = useState(false);
  const animationRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const runAnimation = () => {
      setPhase(0);
      setShowParticles(false);

      animationRef.current = setTimeout(() => {
        setPhase(1);
        animationRef.current = setTimeout(() => {
          setPhase(2);
          animationRef.current = setTimeout(() => {
            setShowParticles(true);
            animationRef.current = setTimeout(() => {
              setPhase(3);
              animationRef.current = setTimeout(() => {
                animationRef.current = setInterval(() => {
                  setPhase(prev => (prev % 3) + 1);
                }, 4000);
              }, 3000);
            }, 2000);
          }, 5000);
        }, 3000);
      }, 1000);
    };

    runAnimation();

    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
        clearInterval(animationRef.current);
      }
    };
  }, []);

  const renderContent = () => {
    if (section === 'hero') {
      if (phase === 0) return <PowerOnAnimation />;
      if (phase === 1) return <CodeTypingAnimation />;
      if (phase === 2) return <TerminalAnimation />;
      if (phase === 3) return (
        <div className="relative h-full">
          {showParticles && <DissolveParticles />}
          <ProfileDisplay />
        </div>
      );
    }

    switch (section) {
      case 'skills':
        return <SkillsVisualization />;
      case 'experience':
        return <ExperienceDashboard />;
      case 'projects':
        return <ProjectShowcase />;
      case 'contact':
        return <TerminalInterface />;
      default:
        return phase === 3 ? <ProfileDisplay /> : null;
    }
  };

  return (
<div className="relative w-full max-w-xl mx-auto">
        <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 via-cyan-500/20 to-primary-500/20 blur-xl rounded-3xl" />

<div className="relative bg-black/90 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-3 sm:p-4 shadow-[0_0_50px_rgba(0,255,255,0.25)]">          <div className="flex items-center gap-1.5 sm:gap-2 mb-3">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
            <div className="ml-2 flex-1 bg-gray-700 rounded-full h-4 px-2 flex items-center">
              <span className="text-[8px] text-gray-400 font-mono truncate">
                vscode://portfolio/developer.js
              </span>
            </div>
          </div>

         <div className="relative monitor-screen h-72 sm:h-96 md:h-[520px] p-3 sm:p-4 overflow-hidden bg-black">

  {/* Animated Grid */}
  <div
    className="absolute inset-0 opacity-20"
    style={{
      backgroundImage: `
        linear-gradient(rgba(0,255,200,0.15) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,255,200,0.15) 1px, transparent 1px)
      `,
      backgroundSize: "30px 30px",
    }}
  />

  {/* Scanning Line */}
  <motion.div
    className="absolute left-0 right-0 h-[2px] bg-cyan-400 shadow-[0_0_20px_#00ffff]"
    animate={{
      top: ["0%", "100%"],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "linear",
    }}
  />

  {/* Floating Glow */}
  <motion.div
    className="absolute inset-0"
    animate={{
      opacity: [0.3, 0.7, 0.3],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
    }}
    style={{
      background:
        "radial-gradient(circle at center, rgba(0,255,255,0.12), transparent 70%)",
    }}
  />

  {/* Screen Content */}
  <AnimatePresence mode="wait">
    <motion.div
      key={`${section}-${phase}`}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.25 }}
      className="h-full relative z-10"
    >
      {renderContent()}
    </motion.div>
  </AnimatePresence>

</div>
</div>

        <div className="absolute -bottom-2 sm:-bottom-3 left-1/2 transform -translate-x-1/2 w-32 sm:w-40 h-3 sm:h-4 bg-gradient-to-b from-gray-700 to-gray-800 rounded-b-lg" />
        <div className="absolute -bottom-6 sm:-bottom-8 left-1/2 transform -translate-x-1/2 w-48 sm:w-60 h-2.5 sm:h-3 bg-gray-900 rounded-xl" />
      </div>
    </div>
  );
}
