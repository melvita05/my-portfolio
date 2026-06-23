import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef ,useState} from 'react';
import { Globe, Server, Database, Settings, CheckCircle, Building } from 'lucide-react';
import TechConstellation from '../skills/TechConstellation';
//import CircularSkills from "../skills/CircularSkill";



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
  bg: 'bg-teal-500/20',
  border: 'hover:border-teal-500/50',
  text: 'text-teal-400',
  tag: 'bg-teal-500/15 text-teal-300 border-teal-500/30',
  check: 'text-teal-400',
},
sky: {
  bg: 'bg-sky-500/20',
border: 'border border-white/10 hover:border-teal-500/50',
  text: 'text-sky-400',
  tag: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
  check: 'text-sky-400',
},
};


const CircularSkill = ({ name, percent, color, trigger }: any) => {
  const [display, setDisplay] = useState(0);

  const radius = 50;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = 2 * Math.PI * normalizedRadius;

useEffect(() => {
  if (!trigger) {
    setDisplay(0);
    return;
  }

  const controls = animate(0, percent, {
    duration: 1.5,
    ease: "easeInOut",
    onUpdate: (v) => setDisplay(Math.round(v)),
  });

  return () => controls.stop();
}, [trigger, percent]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-[120px] h-[120px]">
        <svg height={120} width={120} className="rotate-[-90deg]">

          <circle
            stroke="#1f2937"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={60}
            cy={60}
          />

          <motion.circle
            stroke={color}
            fill="transparent"
            strokeWidth={stroke}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={60}
            cy={60}
            strokeDasharray={circumference}
            animate={{
              strokeDashoffset: trigger
                ? circumference - (percent / 100) * circumference
                : circumference,
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.p className="text-white font-bold text-lg">
    {display}%

</motion.p>
        </div>
      </div>

      <p className="text-white font-semibold mt-2">{name}</p>
    </div>
  );
};
export default function SkillsSection() {
  const skillsRef = useRef(null);
  const certsRef = useRef(null);
const circularRef = useRef(null);
  const circularInView = useInView(circularRef, {
  once: true,
  amount: 0.3,
});

  const skillsInView = useInView(skillsRef, {
    once: false,
amount: 0.1,
  });

  
  const certsInView = useInView(certsRef, {
    once: false,
    margin: '-100px',
  });

//    const [startCircular, setStartCircular] = useState(false);

// useEffect(() => {
//   if (skillsInView) {
//     const timer = setTimeout(() => {
//       setStartCircular(true);
//     }, 300); // small delay after entering section

//     return () => clearTimeout(timer);
//   } else {
//     setStartCircular(false);
//   }
// }, [skillsInView]);
 

    

  return (
<section id="skills" ref={skillsRef} className="py-10">
                  <div className="container mx-auto px-4 lg:px-8">

        {/* HEADER */}
<motion.div className="text-center mt-10 mb-4"
          initial={{ opacity: 0, y: 50 }}
          animate={skillsInView ? { opacity: 1, y: 0 } : {}}
        >
          <p className="text-primary-400 font-mono text-sm mb-2">
            WHAT I WORK WITH
          </p>

<h2 className="text-4xl sm:text-5xl font-extrabold">
              <span className="text-white">My </span>
            <span className="gradient-text">Skills</span>
          </h2>
        </motion.div>

        {/* TECH CONSTELLATION */}
<TechConstellation isInView={skillsInView} />
        {/* CIRCULAR SKILLS SECTION */}
<div
  ref={circularRef}
className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 mb-16">  
    {circularSkills.map((skill, i) => (
  <motion.div
    key={skill.name}
    initial={{ opacity: 0, scale: 0.5 }}
animate={skillsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
    viewport={{ once: true }}
    transition={{ delay: i * 0.1 }}
  >
<CircularSkill {...skill} trigger={circularInView} />
  </motion.div>
))}
</div>

        {/* SKILLS */}
        

        {/* CERTIFICATIONS */}
<motion.div ref={certsRef} className="text-center mt-24 mb-10">
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
      
    </section>
  );
}