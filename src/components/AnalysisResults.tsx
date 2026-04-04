import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, ShieldAlert, ShieldCheck, XCircle } from "lucide-react";
import type { AnalysisResult } from "./EmailAnalyzer";

const verdictConfig = {
  safe: { label: "Safe", color: "text-safe", bg: "bg-safe/10", border: "border-safe/30", icon: ShieldCheck },
  suspicious: { label: "Suspicious", color: "text-warning", bg: "bg-warning/10", border: "border-warning/30", icon: AlertTriangle },
  dangerous: { label: "Dangerous", color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/30", icon: ShieldAlert },
};

const flagIcons = {
  danger: XCircle,
  warning: AlertTriangle,
  safe: CheckCircle,
};

const flagColors = {
  danger: "text-destructive border-destructive/20 bg-destructive/5",
  warning: "text-warning border-warning/20 bg-warning/5",
  safe: "text-safe border-safe/20 bg-safe/5",
};

const AnalysisResults = ({ result }: { result: AnalysisResult }) => {
  const config = verdictConfig[result.verdict];
  const Icon = config.icon;

  const scoreColor =
    result.score >= 60 ? "text-destructive" : result.score >= 30 ? "text-warning" : "text-safe";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="mt-8"
    >
      <div className="glass rounded-2xl p-6 md:p-8 space-y-6">
        {/* Score + Verdict */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative w-28 h-28 flex-shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(220 14% 18%)" strokeWidth="6" />
              <motion.circle
                cx="50" cy="50" r="42"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={264}
                className={scoreColor}
                initial={{ strokeDashoffset: 264 }}
                animate={{ strokeDashoffset: 264 - (264 * result.score) / 100 }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                className={`text-2xl font-display font-bold ${scoreColor}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {result.score}
              </motion.span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Risk</span>
            </div>
          </div>

          <div className="text-center sm:text-left">
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold ${config.bg} ${config.border} border ${config.color}`}>
              <Icon className="w-4 h-4" />
              {config.label}
            </div>
            <p className="text-muted-foreground text-sm mt-2 max-w-md">
              {result.verdict === "safe"
                ? "This email appears to be safe, but always remain cautious with unexpected messages."
                : result.verdict === "suspicious"
                ? "This email shows some phishing indicators. Proceed with caution and verify the sender."
                : "This email has strong phishing indicators. Do not click any links or share personal information."}
            </p>
          </div>
        </div>

        {/* Flags */}
        <div className="space-y-3">
          <h3 className="text-sm font-display font-semibold text-muted-foreground uppercase tracking-wider">
            Findings
          </h3>
          {result.flags.map((flag, i) => {
            const FlagIcon = flagIcons[flag.type];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className={`flex items-start gap-3 p-4 rounded-xl border ${flagColors[flag.type]}`}
              >
                <FlagIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">{flag.label}</p>
                  <p className="text-xs opacity-80 mt-0.5">{flag.detail}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default AnalysisResults;
