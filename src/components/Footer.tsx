import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="py-12 border-t border-white/5 bg-obsidian text-slate-500 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-gray-300 font-display font-medium">
            Kunal Choudhary <span className="text-accent-blue font-bold">©</span> 2026.
          </span>{" "}
          All rights reserved worldwide.
        </div>

        <div className="flex items-center gap-6">
          {/* Back to Top anchor */}
          <button
            onClick={scrollToTop}
            className="p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-300 group"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
