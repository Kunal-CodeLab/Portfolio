import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowDown, Code, Github, Linkedin } from "lucide-react";
import { DEV_PROFILE } from "../data";

interface HeroProps {
  onOpenRecruiterModal?: () => void;
}

export default function Hero({ onOpenRecruiterModal }: HeroProps) {
  const roles = [
    "Full-Stack & Web Developer",
    "Software Engineer (.NET 8 & Python)",
    "DevOps & Cloud Specialist",
    "Desktop Application Engineer"
  ];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let typingTimer: NodeJS.Timeout;
    const currentWord = roles[currentRoleIndex];

    if (isDeleting) {
      typingTimer = setTimeout(() => {
        setDisplayedRole(currentWord.substring(0, displayedRole.length - 1));
      }, 50);
    } else {
      typingTimer = setTimeout(() => {
        setDisplayedRole(currentWord.substring(0, displayedRole.length + 1));
      }, 100);
    }

    if (!isDeleting && displayedRole === currentWord) {
      typingTimer = setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && displayedRole === "") {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(typingTimer);
  }, [displayedRole, isDeleting, currentRoleIndex]);

  const handleScrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center pt-28 pb-16 dot-bg overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-accent-purple/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-accent-blue/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
        {/* Left Column: Core Value & Bio */}
        <div className="lg:col-span-8 flex flex-col items-start">
          {/* Top Pill Status Tag */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md mb-8 max-w-full"
          >
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-teal opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyber-teal"></span>
            </span>
            <span className="text-xs font-mono font-medium text-zinc-300 leading-normal tracking-wide">
              {DEV_PROFILE.location}
            </span>
          </motion.div>

          {/* Main Title & Dynamic Role Typing */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.08]"
          >
            Kunal Choudhary.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-3 text-lg sm:text-2xl font-mono text-zinc-400 mb-8 min-h-[36px]"
          >
            <Code className="w-5 h-5 text-accent-blue shrink-0" />
            <span className="text-zinc-400">I'm a </span>
            <span className="text-white font-semibold border-b-2 border-accent-purple pb-0.5">
              {displayedRole}
            </span>
          </motion.div>

          {/* Value Statement */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-xl text-zinc-400 text-base md:text-lg leading-snug font-light mb-10 font-sans"
          >
            Result-driven <span className="text-white font-medium">Full-Stack & Desktop Developer</span> with commercial freelance experience building live production web applications, automated cloud infrastructure (<span className="text-accent-blue font-medium">AWS/Terraform</span>), and scalable <span className="text-accent-purple italic font-medium">C# .NET 8</span> software.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center gap-3 w-full sm:w-auto"
          >
            {onOpenRecruiterModal && (
              <button
                onClick={onOpenRecruiterModal}
                className="w-full sm:w-auto px-5 py-3.5 bg-gradient-to-r from-accent-purple to-accent-blue text-white text-[11px] font-bold uppercase tracking-widest rounded-sm flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-transform duration-300 shadow-lg"
              >
                <span>30s Recruiter Pitch</span>
              </button>
            )}

            <button
              onClick={handleScrollToProjects}
              className="w-full sm:w-auto px-6 py-3.5 bg-white text-obsidian text-[11px] font-bold uppercase tracking-widest rounded-sm flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors duration-300 shadow-md"
            >
              <span>Explore My Work</span>
            </button>

            <a
              href={DEV_PROFILE.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 bg-transparent border border-white/20 text-white text-[11px] font-bold uppercase tracking-widest rounded-sm flex items-center justify-center gap-2 hover:bg-white/10 hover:border-white/40 transition-all duration-300"
            >
              <span>View Resume PDF</span>
            </a>
          </motion.div>

          {/* Social Links Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center gap-4 mt-12 text-xs font-mono text-zinc-400"
          >
            <a
              href={DEV_PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-300 flex items-center gap-1 group"
            >
              <Github className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
              <span>GitHub</span>
            </a>
            <span className="w-[1px] h-3 bg-white/10" />
            <a
              href={DEV_PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-300 flex items-center gap-1 group"
            >
              <Linkedin className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
              <span>LinkedIn</span>
            </a>
          </motion.div>
        </div>

        {/* Right Side Authentic Career Highlights & Work Impact Card */}
        <div className="hidden lg:block lg:col-span-4 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden group hover:border-white/20 transition-all duration-300 shadow-xl"
          >
            <div className="absolute top-[-20%] right-[-20%] w-48 h-48 bg-accent-purple/15 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-[-20%] left-[-20%] w-48 h-48 bg-accent-blue/15 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-accent-purple font-bold block">
                CAREER HIGHLIGHTS
              </span>
              <span className="px-2 py-0.5 rounded bg-cyber-teal/10 text-cyber-teal text-[9px] font-mono border border-cyber-teal/20 uppercase font-semibold">
                Verified
              </span>
            </div>
            <span className="text-xs font-mono text-zinc-500 block mb-6">
              Track Record // Real Production Work
            </span>

            <div className="space-y-3.5">
              <div className="flex flex-col border-b border-white/5 pb-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">Commercial Clients</span>
                  <span className="text-[10px] text-accent-blue font-mono font-bold">+40% Speed</span>
                </div>
                <span className="text-[11px] font-mono text-zinc-400 mt-0.5">Huzurr.com & Client Sites</span>
              </div>

              <div className="flex flex-col border-b border-white/5 pb-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">Python Internship</span>
                  <span className="text-[10px] text-accent-purple font-mono font-bold">30+ Defects</span>
                </div>
                <span className="text-[11px] font-mono text-zinc-400 mt-0.5">Codveda Technologies</span>
              </div>

              <div className="flex flex-col border-b border-white/5 pb-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">C# .NET 8 WPF</span>
                  <span className="text-[10px] text-cyber-teal font-mono font-bold">NAudio/Win32</span>
                </div>
                <span className="text-[11px] font-mono text-zinc-400 mt-0.5">SonicBoard Audio Engine</span>
              </div>

              <div className="flex flex-col border-b border-white/5 pb-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">DevOps IaC</span>
                  <span className="text-[10px] text-accent-blue font-mono font-bold">99.9% Uptime</span>
                </div>
                <span className="text-[11px] font-mono text-zinc-400 mt-0.5">Terraform, Ansible & AWS</span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyber-teal animate-pulse" />
                <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-300">Status</span>
              </div>
              <span className="text-[10px] font-mono text-cyber-teal font-bold uppercase">Ready to Join</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 invisible lg:visible pointer-events-none"
      >
        <span className="text-[9px] font-mono tracking-[0.25em] text-zinc-500 uppercase">
          SCROLL TO DISCOVER
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-3.5 h-3.5 text-accent-blue" />
        </motion.div>
      </motion.div>
    </section>
  );
}
