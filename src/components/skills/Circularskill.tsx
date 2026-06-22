import { useEffect, useState } from "react";

const skills = [
  { name: "React", percent: 85 },
  { name: "Node", percent: 80 },
  { name: "MongoDB", percent: 75 },
  { name: "Express", percent: 78 },
];

export default function CircularSkills() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-10 justify-items-center">
      {skills.map((skill, index) => {
        const radius = 50;
        const stroke = 8;
        const normalizedRadius = radius - stroke * 2;
        const circumference = normalizedRadius * 2 * Math.PI;

        const strokeDashoffset = animate
          ? circumference - (skill.percent / 100) * circumference
          : circumference;

        return (
          <div key={index} className="flex flex-col items-center">
            <svg height={120} width={120}>
              <circle
                stroke="#2d2d2d"
                fill="transparent"
                strokeWidth={stroke}
                r={normalizedRadius}
                cx={60}
                cy={60}
              />

              <circle
                stroke="#00f5ff"
                fill="transparent"
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeDasharray={circumference + " " + circumference}
                style={{
                  strokeDashoffset,
                  transition: "stroke-dashoffset 1.2s ease-out",
                }}
                r={normalizedRadius}
                cx={60}
                cy={60}
              />
            </svg>

            <div className="text-center mt-2">
              <p className="text-white font-semibold">{skill.name}</p>
              <p className="text-gray-400 text-sm">{skill.percent}%</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}