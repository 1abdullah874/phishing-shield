import HeroSection from "@/components/HeroSection";
import EmailAnalyzer from "@/components/EmailAnalyzer";
import TipsSection from "@/components/TipsSection";
import { Shield } from "lucide-react";

const Index = () => (
  <div className="min-h-screen">
    {/* Nav */}
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          <span className="font-display font-bold text-lg">PhishGuard</span>
        </div>
        <a href="#analyzer" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body">
          Scan Email
        </a>
      </div>
    </nav>

    <HeroSection />
    <EmailAnalyzer />
    <TipsSection />

    {/* Footer */}
    <footer className="border-t border-border/50 py-8 text-center">
      <p className="text-muted-foreground text-xs font-body">
        © 2026 PhishGuard. All analysis is performed client-side — your data never leaves your browser.
      </p>
    </footer>
  </div>
);

export default Index;
