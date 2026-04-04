import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, AlertTriangle, CheckCircle, Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnalysisResults from "./AnalysisResults";

interface ThreatFlag {
  type: "danger" | "warning" | "safe";
  label: string;
  detail: string;
}

export interface AnalysisResult {
  score: number;
  verdict: "safe" | "suspicious" | "dangerous";
  flags: ThreatFlag[];
}

const analyzeEmail = (text: string): AnalysisResult => {
  const flags: ThreatFlag[] = [];
  let score = 0;

  const urgentWords = /urgent|immediately|act now|expire|suspend|verify your|confirm your|within 24/gi;
  const suspiciousLinks = /click here|bit\.ly|tinyurl|goo\.gl|t\.co|shortened/gi;
  const personalInfo = /password|ssn|social security|credit card|bank account|pin number/gi;
  const spoofPatterns = /dear customer|dear user|valued member|account holder/gi;
  const threatPatterns = /account will be|will be closed|will be suspended|unauthorized|locked out/gi;
  const grammarIssues = /\b(kindly|do the needful|revert back|please to)\b/gi;

  const urgentMatches = text.match(urgentWords);
  if (urgentMatches) {
    score += Math.min(urgentMatches.length * 15, 30);
    flags.push({ type: "danger", label: "Urgency Tactics", detail: `Found ${urgentMatches.length} urgency-inducing phrase(s) designed to pressure you into acting quickly.` });
  }

  const linkMatches = text.match(suspiciousLinks);
  if (linkMatches) {
    score += Math.min(linkMatches.length * 20, 30);
    flags.push({ type: "danger", label: "Suspicious Links", detail: `Detected ${linkMatches.length} potentially malicious or shortened link(s).` });
  }

  const infoMatches = text.match(personalInfo);
  if (infoMatches) {
    score += Math.min(infoMatches.length * 20, 30);
    flags.push({ type: "danger", label: "Personal Info Request", detail: `The email requests sensitive information (${infoMatches.map(m => m.toLowerCase()).join(", ")}).` });
  }

  const spoofMatches = text.match(spoofPatterns);
  if (spoofMatches) {
    score += 15;
    flags.push({ type: "warning", label: "Generic Greeting", detail: "Uses a generic greeting instead of your name — common in phishing emails." });
  }

  const threatMatches = text.match(threatPatterns);
  if (threatMatches) {
    score += 20;
    flags.push({ type: "danger", label: "Threat Language", detail: "Contains threatening language about account suspension or closure." });
  }

  const grammarMatches = text.match(grammarIssues);
  if (grammarMatches) {
    score += 10;
    flags.push({ type: "warning", label: "Grammar Issues", detail: "Contains unusual phrasing commonly found in phishing emails." });
  }

  if (flags.length === 0) {
    flags.push({ type: "safe", label: "No Threats Detected", detail: "No obvious phishing indicators were found. Always stay cautious with unexpected emails." });
  }

  score = Math.min(score, 100);

  const verdict: AnalysisResult["verdict"] = score >= 60 ? "dangerous" : score >= 30 ? "suspicious" : "safe";

  return { score, verdict, flags };
};

const EmailAnalyzer = () => {
  const [emailText, setEmailText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async () => {
    if (!emailText.trim()) return;
    setIsAnalyzing(true);
    setResult(null);
    await new Promise((r) => setTimeout(r, 1800));
    const analysis = analyzeEmail(emailText);
    setResult(analysis);
    setIsAnalyzing(false);
  };

  return (
    <section id="analyzer" className="relative py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
            Analyze Your Email
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Paste the suspicious email content below and our detector will scan for phishing indicators.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-2xl p-6 md:p-8"
        >
          <div className="relative">
            <Mail className="absolute top-4 left-4 w-5 h-5 text-muted-foreground" />
            <textarea
              value={emailText}
              onChange={(e) => setEmailText(e.target.value)}
              placeholder="Paste the email content here..."
              className="w-full min-h-[200px] bg-muted/50 rounded-xl p-4 pl-12 text-foreground placeholder:text-muted-foreground/60 border border-border/50 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 resize-none font-body text-sm transition-colors"
            />
          </div>

          <div className="mt-4 flex justify-end">
            <Button
              onClick={handleAnalyze}
              disabled={!emailText.trim() || isAnalyzing}
              className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary font-display font-semibold px-8 py-3 rounded-xl text-base transition-all disabled:opacity-40 disabled:shadow-none"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4 mr-2" />
                  Analyze Email
                </>
              )}
            </Button>
          </div>
        </motion.div>

        <AnimatePresence>
          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-8"
            >
              <div className="glass rounded-2xl p-8 flex flex-col items-center gap-4">
                <div className="relative w-16 h-16">
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-primary/30"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <div className="w-full h-full rounded-full border-2 border-primary/60 flex items-center justify-center">
                    <Loader2 className="w-6 h-6 text-primary animate-spin" />
                  </div>
                </div>
                <p className="text-muted-foreground text-sm font-body">Scanning for threats...</p>
                <div className="w-full max-w-xs h-1 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.8, ease: "easeInOut" }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {result && !isAnalyzing && (
            <AnalysisResults result={result} />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default EmailAnalyzer;
