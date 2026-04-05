import { motion } from "framer-motion";
import { Heart, Coffee } from "lucide-react";
import qrCode from "@/assets/buymeacoffee-qr.png";

const CreatorSection = () => (
  <section className="py-20 px-4">
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass rounded-2xl p-8 md:p-12 text-center"
      >
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-display font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider">
          <Heart className="w-3.5 h-3.5" />
          Support the Creator
        </div>

        <h2 className="text-2xl md:text-3xl font-display font-bold">
          Built by{" "}
          <span className="text-gradient">Abdullah Ali Saleem</span>
        </h2>

        <p className="text-muted-foreground font-body mt-4 max-w-md mx-auto">
          If PhishGuard helped you stay safe online, consider supporting the project with a coffee. Every contribution keeps this tool free and maintained.
        </p>

        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="bg-white rounded-xl p-3 inline-block">
            <img
              src={qrCode}
              alt="Buy Me a Coffee QR Code"
              className="w-44 h-44 object-contain"
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground font-body">
            <Coffee className="w-4 h-4 text-yellow-500" />
            Scan to Buy Me a Coffee
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default CreatorSection;
