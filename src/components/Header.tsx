import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Terminal as TerminalIcon, FileText, Menu, X } from "lucide-react";
import { DEV_PROFILE } from "../data";

interface HeaderProps {
  onOpenTerminal?: () => void;
}

export default function Header({ onOpenTerminal }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("about");

  const navLinks = [
    { label: "About", href: "#about", id: "about" },
    { label: "Skills", href: "#skills", id: "skills" },
    { label: "Projects", href: "#projects", id: "projects" },
    { label: "Education", href: "#education", id: "education" },
    { label: "Contact", href: "#contact", id: "contact" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Check if at the bottom of the page
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      if (scrollPosition + windowHeight >= fullHeight - 80) {
        setActiveSection("contact");
        return;
      }

      // Ordered list matching exact DOM appearance from top to bottom
      const sectionIds = ["about", "skills", "projects", "education", "contact"];
      const viewportThreshold = windowHeight * 0.35;
      let current = "about";

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= viewportThreshold) {
            current = id;
          }
        }
      }

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActiveSection(id);
    setMobileMenuOpen(false);

    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-obsidian/85 backdrop-blur-md py-3.5 sm:py-4 border-b border-white/10 shadow-2xl"
          : "bg-transparent py-4 sm:py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            setActiveSection("about");
          }}
          className="font-display text-lg font-extrabold text-white tracking-wider uppercase flex items-center gap-2 group"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-accent-blue group-hover:scale-125 transition-transform" />
          <span>Kunal<span className="text-accent-blue">.</span></span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`text-xs font-mono tracking-widest uppercase transition-all duration-200 relative py-1 ${
                  isActive
                    ? "text-white font-bold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-blue rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right CTA Group */}
        <div className="hidden md:flex items-center gap-3">
          {onOpenTerminal && (
            <button
              onClick={onOpenTerminal}
              className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-zinc-300 border border-white/10 flex items-center gap-2 transition-colors"
              title="Open CLI Terminal (Ctrl + K)"
            >
              <TerminalIcon className="w-3.5 h-3.5 text-accent-blue" />
              <span className="text-[10px] text-zinc-400">Ctrl + K</span>
            </button>
          )}

          <a
            href={DEV_PROFILE.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-bold uppercase tracking-wider shadow-md shadow-blue-600/25 border border-blue-400/30 flex items-center gap-1.5 transition-all"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-zinc-400 hover:text-white"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-charcoal/95 border-b border-white/10 p-6 flex flex-col gap-4 backdrop-blur-xl"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.id)}
              className={`text-sm font-mono uppercase tracking-widest py-1.5 transition-colors ${
                activeSection === link.id ? "text-accent-blue font-bold" : "text-zinc-300 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            {onOpenTerminal && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTerminal();
                }}
                className="w-full py-2.5 rounded-xl bg-white/5 text-xs font-mono text-zinc-300 border border-white/10 flex items-center justify-center gap-2"
              >
                <TerminalIcon className="w-4 h-4 text-accent-blue" />
                <span>Open Terminal CLI</span>
              </button>
            )}

            <a
              href={DEV_PROFILE.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-accent-blue text-white text-xs font-mono font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>Download Resume PDF</span>
            </a>
          </div>
        </motion.div>
      )}
    </header>
  );
}
