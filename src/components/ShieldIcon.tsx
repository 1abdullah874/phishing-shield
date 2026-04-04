import { motion } from "framer-motion";

const ShieldIcon = () => (
  <motion.div
    className="relative w-32 h-32 mx-auto"
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
    <svg viewBox="0 0 120 140" className="w-full h-full">
      <defs>
        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(185 80% 50%)" />
          <stop offset="100%" stopColor="hsl(185 80% 35%)" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <motion.path
        d="M60 8 L110 30 L110 75 C110 105 60 132 60 132 C60 132 10 105 10 75 L10 30 Z"
        fill="none"
        stroke="url(#shieldGrad)"
        strokeWidth="2.5"
        filter="url(#glow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
      <motion.path
        d="M45 70 L55 82 L80 55"
        fill="none"
        stroke="hsl(152 70% 45%)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#glow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      />
    </svg>
    <motion.div
      className="absolute inset-0 rounded-full"
      style={{
        background: "radial-gradient(circle, hsl(185 80% 50% / 0.15) 0%, transparent 70%)",
      }}
      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
  </motion.div>
);

export default ShieldIcon;
