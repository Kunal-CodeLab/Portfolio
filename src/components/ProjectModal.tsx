import { motion } from "motion/react";
import { X, ExternalLink, Github, CheckCircle2, Code2, Layers } from "lucide-react";
import { Project } from "../types";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
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
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-accent-blue/10 text-accent-blue text-[10px] font-mono font-semibold uppercase tracking-wider border border-accent-blue/20">
              {project.category}
            </span>
            <h3 className="font-display text-base sm:text-lg font-bold text-white truncate max-w-[280px] sm:max-w-md">
              {project.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 custom-scrollbar text-zinc-300">
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 mb-2">
              Overview & Problem Solved
            </h4>
            <p className="text-sm font-sans leading-relaxed text-zinc-200">
              {project.longDescription || project.description}
            </p>
          </div>

          {project.features && project.features.length > 0 && (
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyber-teal" />
                Key Technical Features
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs font-sans text-zinc-200 flex items-start gap-2.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-blue shrink-0 mt-1.5" />
                    <span className="leading-snug">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.architecture && (
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 mb-2 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-accent-blue" />
                Architecture & Engineering Stack
              </h4>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-xs font-mono text-accent-blue">
                {project.architecture}
              </div>
            </div>
          )}

          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyber-teal" />
              Technologies Used
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-zinc-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 z-20 flex items-center justify-between gap-4 px-6 py-4 bg-obsidian/90 border-t border-white/10 backdrop-blur-md">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
          >
            Close
          </button>

          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono text-white flex items-center gap-2 transition-colors border border-white/10"
              >
                <Github className="w-4 h-4" />
                <span>Source Code</span>
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 shadow-md shadow-blue-600/25 border border-blue-400/30 transition-all"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
