import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function SectionWrapper({ children }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.4 });

  return (
    <motion.section
      ref={ref}
      className="w-full flex items-center justify-center"
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.section>
  );
}