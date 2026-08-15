import { motion } from "motion/react";
import { X, Zap, FileText, CheckCircle2, Mail, Phone } from "lucide-react";
import { DEV_PROFILE } from "../data";

interface RecruiterModalProps {
  onClose: () => void;
}

export default function RecruiterModal({ onClose }: RecruiterModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-obsidian/85 backdrop-blur-xl z-0"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 350 }}
        className="relative z-10 w-full max-w-3xl max-h-[90vh] bg-charcoal/95 border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col my-auto backdrop-blur-2xl"
      >
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-obsidian/90 border-b border-white/10 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-accent-blue/10 text-accent-blue border border-accent-blue/20">
              <Zap className="w-4 h-4" />
            </span>
            <div>
              <h3 className="font-display text-sm sm:text-base font-extrabold text-white">
                30-Second Recruiter Pitch
              </h3>
              <p className="text-[10px] font-mono text-zinc-400">
                High-signal candidate summary for hiring managers
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 custom-scrollbar text-zinc-300">
          <div className="p-4 rounded-2xl bg-accent-purple/10 border border-accent-purple/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-accent-purple font-bold block">
                Executive Candidate Summary
              </span>
              <h4 className="text-white text-base font-bold font-display mt-0.5">
                Kunal Choudhary — Full-Stack & Desktop Developer
              </h4>
              <p className="text-xs text-zinc-300 mt-1 leading-snug">
                BCA 6th Sem Student at Jaipur National University (2023-2026). Proven commercial freelance experience (`Huzurr.com`) & Python Internship at Codveda.
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-xl bg-cyber-teal/20 text-cyber-teal border border-cyber-teal/30 text-xs font-mono font-bold uppercase tracking-wider">
                Available Immediately
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
              <span className="text-[10px] font-mono text-zinc-400 block uppercase">Notice Period</span>
              <span className="text-sm font-bold text-white block">Immediate (0 Days)</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
              <span className="text-[10px] font-mono text-zinc-400 block uppercase">Location Flexibility</span>
              <span className="text-sm font-bold text-white block">Remote / Relocate</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
              <span className="text-[10px] font-mono text-zinc-400 block uppercase">Experience Level</span>
              <span className="text-sm font-bold text-white block">Freelance + Intern</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 mb-3 flex items-center gap-2">
              Roles Targeted
            </h4>
            <div className="flex flex-wrap gap-2">
              {[
                ".NET Developer (C# / WPF / Win32)",
                "Full-Stack Developer (React / Node / Python)",
                "DevOps & Cloud Engineer (AWS / Terraform / Ansible)",
                "Software Engineer (Desktop & Web Applications)"
              ].map((role, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
                  {role}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyber-teal" />
              Key Project Highlights
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <span className="text-xs font-bold text-white block">Smart File Management System</span>
                <p className="text-[11px] text-zinc-400 leading-snug">
                  Feature-rich C# .NET desktop app for automated local file organization & directory watchers.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <span className="text-xs font-bold text-white block">SonicBoard Streaming App</span>
                <p className="text-[11px] text-zinc-400 leading-snug">
                  Low-latency C# .NET desktop audio soundboard with Win32 global hotkey shortcuts.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <span className="text-xs font-bold text-white block">GitAutoPush Utility</span>
                <p className="text-[11px] text-zinc-400 leading-snug">
                  Silent Windows system tray tool for real-time automated git add, commit, and GitHub push.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <span className="text-xs font-bold text-white block">DevOps Automation</span>
                <p className="text-[11px] text-zinc-400 leading-snug">
                  Terraform & Ansible Infrastructure as Code deploying AWS VPC subnets & Nginx servers.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1 sm:col-span-2">
                <span className="text-xs font-bold text-white block">Forensic Utility Tool</span>
                <p className="text-[11px] text-zinc-400 leading-snug">
                  PyQt5 desktop forensic recovery tool carving deleted files & browser cache artifacts.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 z-20 flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 bg-obsidian/90 border-t border-white/10 backdrop-blur-md">
          <span className="text-xs font-mono text-zinc-500 hidden sm:inline">
            Frictionless recruiter actions
          </span>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={DEV_PROFILE.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white text-xs font-mono font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <FileText className="w-4 h-4 text-accent-blue" />
              <span>Resume PDF</span>
            </a>

            <a
              href={`mailto:${DEV_PROFILE.email}`}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-accent-blue text-white text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-accent-blue/90 transition-colors shadow-md"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Kunal</span>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
