import { motion } from "framer-motion";
import { Eye, Link2, Lock, UserX } from "lucide-react";

const tips = [
  { icon: UserX, title: "Check the Sender", desc: "Verify the sender's email address carefully. Phishers often use addresses that look similar to legitimate ones." },
  { icon: Link2, title: "Hover Over Links", desc: "Before clicking, hover to see the real URL. Shortened or mismatched URLs are a major red flag." },
  { icon: Eye, title: "Spot Urgency", desc: "Phishing emails create fake urgency — 'Act now!', 'Account expires!' — to bypass your judgment." },
  { icon: Lock, title: "Never Share Credentials", desc: "Legitimate companies will never ask for passwords or sensitive data via email." },
];

const TipsSection = () => (
  <section className="py-20 px-4">
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-display font-bold">Stay Protected</h2>
        <p className="text-muted-foreground mt-3 max-w-md mx-auto">Quick tips to identify phishing emails before they can do damage.</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-5">
        {tips.map(({ icon: Icon, title, desc }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-2xl p-6 group hover:border-primary/30 transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-display font-semibold text-lg mb-2">{title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TipsSection;
