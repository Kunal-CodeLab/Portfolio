import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Calendar, Award, Code, Globe, Terminal, Server, Star, CheckCircle2, ArrowUpRight, ExternalLink } from "lucide-react";
import { DEV_PROFILE, SKILL_CATEGORIES, CERTIFICATIONS } from "../data";
import GitHubStats from "./GitHubStats";

export default function BentoAbout() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString("en-US", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });

  return (
    <section id="about" className="py-16 sm:py-24 dot-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6">
          <div>
            <span className="text-xs font-mono font-semibold tracking-[0.2em] text-accent-purple uppercase block mb-3">
              ABOUT & STACK
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              About Me<span className="text-accent-blue">.</span>
            </h2>
          </div>
          <p className="max-w-md text-zinc-400 text-sm font-sans leading-relaxed">
            A showcase of my projects, technical skills, certifications, and professional growth.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tile 1 & 2: Primary Profile & Bio Card (Takes 3 Columns full width) */}
          <div className="md:col-span-3 glass-panel rounded-3xl p-5 sm:p-10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent-blue/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col gap-6 relative z-10">
              {/* Header Profile Tag */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/5 gap-4">
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-wide">
                    {DEV_PROFILE.name}
                  </h3>
                  <p className="text-xs font-mono text-accent-blue tracking-widest uppercase mt-1 font-semibold">
                    {DEV_PROFILE.title}
                  </p>
                </div>

                <div className="flex items-center gap-3 self-start sm:self-auto">
                  <div className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-gray-300 flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-accent-purple" />
                    <span>IST (Jaipur) — {formattedTime}</span>
                  </div>
                </div>
              </div>

              {/* Redesigned fresher-friendly layout with detailed Who I Am, info list, and Professional Summary */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
                {/* Left: Who I Am & Key Information */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                  <div>
                    <h4 className="text-accent-blue font-display font-extrabold uppercase tracking-widest text-xs mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-blue inline-block"></span>
                      Who I Am
                    </h4>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      I am a <strong className="text-white font-semibold">Full-Stack & Desktop Software Developer</strong> specializing in building high-performance web applications, automated cloud infrastructure, and low-latency C# .NET desktop tools. With commercial freelance experience delivering live business websites (<span className="text-accent-blue font-medium">Huzurr.com</span>) and Python internship experience at <span className="text-accent-purple font-medium">Codveda Technologies</span>, I focus on scalable software design, performance optimization, and secure system architectures.
                    </p>
                  </div>

                  {/* Info List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 pt-6 border-t border-white/5">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400">Location:</span>
                      <span className="text-white text-xs sm:text-sm font-sans flex items-center gap-1.5 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-accent-blue shrink-0" />
                        Jaipur, Rajasthan, India
                      </span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400">Email:</span>
                      <a href={`mailto:${DEV_PROFILE.email}`} className="text-white hover:text-accent-blue text-xs sm:text-sm font-sans font-medium underline transition-colors truncate">
                        {DEV_PROFILE.email}
                      </a>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400">Phone:</span>
                      <a href={`tel:${DEV_PROFILE.phone.replace(/\s+/g, '')}`} className="text-white hover:text-accent-blue text-xs sm:text-sm font-sans font-medium transition-colors">
                        {DEV_PROFILE.phone}
                      </a>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400">Status:</span>
                      <span className="text-cyber-teal text-xs sm:text-sm font-sans font-bold uppercase tracking-wide">
                        Available for Intern/Fresher roles
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Built-in Professional Summary Card */}
                <div className="lg:col-span-5 flex flex-col justify-between bg-white/[0.02] border border-white/5 rounded-2xl p-5 sm:p-6 relative overflow-hidden group/card hover:border-white/10 transition-colors">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent-purple/5 rounded-full blur-2xl pointer-events-none" />
                  
                  <div>
                    <h4 className="text-accent-purple font-display font-extrabold uppercase tracking-widest text-xs mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-purple inline-block"></span>
                      Professional Summary
                    </h4>
                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-sans">
                      Result-driven <strong className="text-white font-semibold">Full-Stack & Desktop Developer</strong> (BCA 6th Sem, JNU Jaipur) with commercial freelance experience building live production web apps, automated cloud infrastructure (<span className="text-accent-blue font-medium">AWS, Terraform, Ansible</span>), and scalable <span className="text-accent-purple font-medium">C# .NET 8</span> desktop software. Proven track record of improving web performance by <strong className="text-cyber-teal font-semibold">40%</strong>, resolving <strong className="text-cyber-teal font-semibold">30+ software defects</strong> during internship, and delivering end-to-end software solutions.
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">Academic Placement</span>
                    <span className="text-[10px] font-mono text-accent-purple font-bold">BCA 6TH SEM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tile 3: Interactive Skills Stack (Takes 2 Columns) */}
          <div id="skills" className="md:col-span-2 glass-panel rounded-3xl p-5 sm:p-8 flex flex-col justify-between relative group">
            <div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-white/5 mb-6 gap-4">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-accent-purple shrink-0" />
                  <h3 className="font-display text-md font-extrabold text-white tracking-wide uppercase">
                    Interactive Stack Profile
                  </h3>
                </div>

                {/* Subcategory selectors */}
                <div className="flex items-center gap-1 bg-white/5 rounded-xl p-1 border border-white/5 overflow-x-auto no-scrollbar max-w-full">
                  {SKILL_CATEGORIES.map((cat, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveCategory(idx)}
                      className={`text-[10px] font-mono tracking-widest uppercase px-3 py-1.5 rounded-lg whitespace-nowrap transition-all duration-300 ${
                        activeCategory === idx
                          ? "bg-gradient-to-r from-accent-blue to-accent-purple text-white shadow-md font-semibold"
                          : "text-zinc-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {cat.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Skills grid list */}
              <div className="relative min-h-[180px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  >
                    {SKILL_CATEGORIES[activeCategory]?.skills.map((skill, index) => (
                      <div 
                        key={index} 
                        className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all duration-300"
                      >
                        <div className="p-2 rounded-lg bg-white/5 flex items-center justify-center">
                          {activeCategory % 3 === 0 ? (
                            <Terminal className="w-4 h-4 text-accent-blue" />
                          ) : activeCategory % 3 === 1 ? (
                            <Server className="w-4 h-4 text-accent-purple" />
                          ) : (
                            <Globe className="w-4 h-4 text-cyber-teal" />
                          )}
                        </div>
                        <span className="text-zinc-200 text-xs font-mono font-medium">
                          {skill.name}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-gray-400">
              <Code className="w-4 h-4 text-accent-blue" />
              <span>Tailored explicitly for semantic standards and high performance.</span>
            </div>
          </div>

          {/* Tile 4: Certifications Card (Takes 1 Column) */}
          <div className="glass-panel rounded-3xl p-8 flex flex-col justify-between relative group">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Star className="w-4 h-4 text-cyber-teal" />
                <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-gray-400">
                  Accreditation & Seals
                </span>
              </div>

              <div className="flex flex-col gap-4">
                {CERTIFICATIONS.map((cert, index) => (
                  <div key={index} className="border-b border-white/5 last:border-none pb-3 last:pb-0">
                    <div className="text-white text-xs font-mono font-medium leading-relaxed">
                      {cert.name}
                    </div>
                    <div className="text-[10px] font-mono text-accent-blue mt-1.5">
                      Verified Cert — {cert.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-5 border-t border-white/5 mt-6 flex items-center justify-between text-xs font-mono text-gray-400">
              <span>WCT Compliance</span>
              <span className="text-cyber-teal font-semibold">100%</span>
            </div>
          </div>
        </div>

        {/* Rapid Hiring Assessments & Figma-to-Code Sprints */}
        <div className="mt-8 glass-panel rounded-3xl p-6 border border-white/10 relative overflow-hidden bg-white/[0.02]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-accent-purple/20 border border-accent-purple/30 flex items-center justify-center text-accent-purple">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-display text-sm font-extrabold text-white flex items-center gap-2">
                  Company Hiring Assessments & Figma-to-Code Sprints
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-cyber-teal/10 text-cyber-teal border border-cyber-teal/20 uppercase font-semibold">
                    4 Live Deploys
                  </span>
                </h4>
                <p className="text-[11px] font-mono text-zinc-400">
                  Built under 24–48h deadlines with pixel-perfect design accuracy even under strict inspect/export restrictions.
                </p>
              </div>
            </div>
            <a
              href="#projects"
              onClick={() => {
                const el = document.getElementById("projects");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-white flex items-center gap-1.5 transition-colors shrink-0"
            >
              <span>View All Tasks in Projects</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-accent-blue" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-4">
            <a
              href="https://able-space-frontend-f5zn-ten.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 hover:border-accent-purple/40 transition-all group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-white group-hover:text-accent-purple transition-colors">AbleSpace Admin</span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors" />
              </div>
              <p className="text-[10px] font-mono text-zinc-400 leading-tight">
                Pixel-Perfect Admin Panel built from restricted Figma (Inspect & Exports disabled).
              </p>
            </a>

            <a
              href="https://assignment-oc3e45pwy-coderkunal02s-projects.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 hover:border-accent-blue/40 transition-all group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-white group-hover:text-accent-blue transition-colors">Pixel-Perfect Landing</span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors" />
              </div>
              <p className="text-[10px] font-mono text-zinc-400 leading-tight">
                Figma-to-Code responsive web page built under strict export restrictions.
              </p>
            </a>

            <a
              href="https://lead-desk-mini-3j8hc8p23-coderkunal02s-projects.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 hover:border-cyber-teal/40 transition-all group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-white group-hover:text-cyber-teal transition-colors">LeadDesk Mini CRM</span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors" />
              </div>
              <p className="text-[10px] font-mono text-zinc-400 leading-tight">
                Lead management dashboard assessment with responsive filter UI.
              </p>
            </a>

            <a
              href="https://judiciary-gold-7xc89azyj-coderkunal02s-projects.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 hover:border-yellow-400/40 transition-all group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-white group-hover:text-yellow-400 transition-colors">Judiciary Tech Portal</span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors" />
              </div>
              <p className="text-[10px] font-mono text-zinc-400 leading-tight">
                Legal case tracking & lawyer portal full-stack assessment UI.
              </p>
            </a>
          </div>
        </div>

        {/* Live GitHub Stats Row */}
        <div className="mt-8">
          <GitHubStats />
        </div>
      </div>
    </section>
  );
}
