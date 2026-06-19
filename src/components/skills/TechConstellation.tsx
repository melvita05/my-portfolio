import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FileCode, Server, Database, GitBranch, Globe, Layers } from 'lucide-react';

interface TechNode {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  x: number;
  y: number;
  color: string;
}

const techNodes: TechNode[] = [
  { id: 'react', label: 'React.js', icon: Globe, x: 0.35, y: 0.2, color: '#61DAFB' },
  { id: 'node', label: 'Node.js', icon: Server, x: 0.65, y: 0.25, color: '#339933' },
  { id: 'express', label: 'Express.js', icon: Layers, x: 0.8, y: 0.55, color: '#FFFFFF' },
  { id: 'mongodb', label: 'MongoDB', icon: Database, x: 0.5, y: 0.75, color: '#47A248' },
  { id: 'javascript', label: 'JavaScript', icon: FileCode, x: 0.2, y: 0.5, color: '#F7DF1E' },
  { id: 'git', label: 'GitHub', icon: GitBranch, x: 0.3, y: 0.65, color: '#F05032' },
];

const connections = [
  ['react', 'javascript'],
  ['javascript', 'node'],
  ['node', 'express'],
  ['express', 'mongodb'],
  ['javascript', 'git'],
  ['mongodb', 'node'],
];

interface TechConstellationProps {
  isInView: boolean;
}

export default function TechConstellation({ isInView }: TechConstellationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
<div ref={containerRef} className="relative w-full h-[500px]">
        {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {connections.map(([from, to], i) => {
          const fromNode = techNodes.find(n => n.id === from);
          const toNode = techNodes.find(n => n.id === to);
          if (!fromNode || !toNode) return null;

          const x1 = fromNode.x * 100;
          const y1 = fromNode.y * 100;
          const x2 = toNode.x * 100;
          const y2 = toNode.y * 100;

          return (
            <motion.line
              key={`${from}-${to}`}
              x1={`${x1}%`}
              y1={`${y1}%`}
              x2={`${x2}%`}
              y2={`${y2}%`}
              stroke="url(#lineGradient)"
              strokeWidth="2"
              strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: [0, 0.4, 0.6] } : {}}
              transition={{ duration: 2, delay: 0.5 + i * 0.2 }}
            />
          );
        })}
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00D9A5" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.4" />
          </linearGradient>
        </defs>
      </svg>

      {/* Tech nodes */}
      {techNodes.map((node, i) => {
        const Icon = node.icon;
        const isHovered = hoveredNode === node.id;

        // Calculate parallax offset from mouse
        const parallaxX = (mousePos.x - 0.5) * (0.5 - Math.abs(node.x - 0.5)) * 20;
        const parallaxY = (mousePos.y - 0.5) * (0.5 - Math.abs(node.y - 0.5)) * 20;

        return (
          <motion.div
            key={node.id}
            className="absolute flex flex-col items-center cursor-pointer group"
            style={{
              left: `${node.x * 100}%`,
              top: `${node.y * 100}%`,
              transform: `translate(-50%, -50%) translate(${parallaxX}px, ${parallaxY}px)`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 20,
              delay: 0.3 + i * 0.15,
            }}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            {/* Glow effect */}
            <motion.div
              className="absolute w-20 h-20 rounded-full"
              style={{
                background: `radial-gradient(circle, ${node.color}30 0%, transparent 70%)`,
                filter: 'blur(15px)',
              }}
              animate={{
                scale: isHovered ? 1.5 : 1,
                opacity: isHovered ? 0.8 : 0.5,
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Node circle */}
            <motion.div
              className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${node.color}15, ${node.color}08)`,
                border: `1px solid ${node.color}40`,
                boxShadow: isHovered ? `0 0 30px ${node.color}40` : 'none',
              }}
              whileHover={{ scale: 1.15, y: -5 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <Icon className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: node.color }} />

              {/* Floating particles */}
              {isHovered && (
                <motion.div
                  className="absolute inset-0 rounded-xl overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {Array.from({ length: 4 }).map((_, j) => (
                    <motion.div
                      key={j}
                      className="absolute w-1 h-1 rounded-full"
                      style={{ backgroundColor: node.color }}
                      initial={{
                        x: '50%',
                        y: '50%',
                        opacity: 0,
                      }}
                      animate={{
                        x: `${25 + Math.cos(j * Math.PI * 0.5) * 20}%`,
                        y: `${25 + Math.sin(j * Math.PI * 0.5) * 20}%`,
                        opacity: [0, 1, 0],
                      }}
                      transition={{ duration: 1, repeat: Infinity, delay: j * 0.2 }}
                    />
                  ))}
                </motion.div>
              )}
            </motion.div>

            {/* Label */}
            <motion.span
              className="mt-2 text-xs sm:text-sm font-mono"
              style={{ color: isHovered ? node.color : '#9CA3AF' }}
              animate={{ y: isHovered ? 0 : 2 }}
            >
              {node.label}
            </motion.span>
          </motion.div>
        );
      })}

      {/* Ambient floating elements */}
      <motion.div
        className="absolute w-1 h-1 bg-primary-500/50 rounded-full"
        style={{ left: '15%', top: '30%' }}
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-1.5 h-1.5 bg-cyan-500/40 rounded-full"
        style={{ left: '75%', top: '40%' }}
        animate={{
          y: [0, 15, 0],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />
    </div>
  );
}
