import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const SectionWrapper = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.4 });

  return (
    <motion.section
      ref={ref}
      className="h-screen w-full flex items-center justify-center px-10"
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
};

export default SectionWrapper;