import { motion } from "framer-motion";
import ShieldIcon from "./ShieldIcon";

const HeroSection = () => (
  <section className="relative min-h-[85vh] flex items-center justify-center px-4 overflow-hidden">
    {/* Background grid */}
    <div
      className="absolute inset-0 opacity-[0.04]"
      style={{
        backgroundImage: `linear-gradient(hsl(185 80% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(185 80% 50%) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }}
    />
    {/* Radial glow */}
    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />

    <div className="relative z-10 text-center max-w-3xl mx-auto">
      <ShieldIcon />

      <motion.h1
        className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mt-8 leading-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        Detect <span className="text-gradient">Phishing Emails</span>
        <br />Before They Strike
      </motion.h1>

      <motion.p
        className="text-muted-foreground text-lg md:text-xl mt-6 max-w-xl mx-auto font-body"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        Paste any suspicious email and instantly identify phishing tactics, malicious links, and social engineering threats.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="mt-8"
      >
        <a
          href="#analyzer"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-display font-semibold px-8 py-3.5 rounded-xl text-base glow-primary hover:bg-primary/90 transition-all"
        >
          Start Scanning
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5">
            <path d="M8 3v10M8 13l4-4M8 13L4 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-16 flex justify-center gap-12 text-center"
      >
        {[
          { value: "6+", label: "Threat Checks" },
          { value: "< 2s", label: "Scan Time" },
          { value: "100%", label: "Client-Side" },
        ].map(({ value, label }) => (
          <div key={label}>
            <p className="text-2xl font-display font-bold text-gradient">{value}</p>
            <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{label}</p>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
