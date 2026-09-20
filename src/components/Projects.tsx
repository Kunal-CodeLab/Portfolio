import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Github, Layers, ArrowUpRight, Search, Info } from "lucide-react";
import { PROJECTS } from "../data";
import { Project } from "../types";
import ProjectModal from "./ProjectModal";

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ["All", "Desktop Application", "Security & Forensics", "DevOps", "Take-Home Tasks"];

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((proj) => {
      const matchesCategory =
        filter === "All" || proj.category.toLowerCase() === filter.toLowerCase();

      const query = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !query ||
        proj.title.toLowerCase().includes(query) ||
        proj.description.toLowerCase().includes(query) ||
        proj.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        (proj.longDescription && proj.longDescription.toLowerCase().includes(query));

      return matchesCategory && matchesQuery;
    });
  }, [filter, searchQuery]);

  return (
    <section id="projects" className="py-16 sm:py-24 dot-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6">
          <div>
            <span className="text-xs font-mono font-semibold tracking-[0.2em] text-accent-blue uppercase block mb-3">
              CREATIVE WORKS
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Featured Projects<span className="text-accent-blue">.</span>
            </h2>
          </div>
          <p className="max-w-md text-zinc-400 text-sm font-sans leading-relaxed">
            Production web applications, high-performance desktop software, automated cloud infrastructure, and company hiring assessments.
          </p>
        </div>

        {/* Filter Tabs & Search Bar Row */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8 sm:mb-10 pb-6 border-b border-white/5">
          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 bg-white/5 p-1.5 rounded-2xl border border-white/5 overflow-x-auto no-scrollbar max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider uppercase whitespace-nowrap transition-all duration-300 ${
                  filter === cat
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20 font-bold border border-blue-400/30"
                    : "text-zinc-400 hover:text-white hover:bg-white/5 font-medium"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Python, C#, AWS, Vercel..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-10 pr-9 py-2.5 text-xs font-sans text-white placeholder-zinc-500 focus:outline-none focus:border-accent-blue transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white text-xs font-mono"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="glass-panel rounded-3xl overflow-hidden flex flex-col justify-between group hover:border-accent-blue/30 transition-all duration-300 shadow-xl relative"
              >
                <div className="p-6 pb-4">
                  {/* Card Header & Category Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full bg-white/5 text-accent-blue text-[10px] font-mono font-semibold uppercase tracking-wider border border-white/10">
                      {project.category}
                    </span>
                    {project.highlighted && (
                      <span className="px-2.5 py-0.5 rounded bg-blue-500/15 text-blue-400 text-[9px] font-mono font-bold uppercase tracking-wider border border-blue-500/30">
                        Flagship
                      </span>
                    )}
                  </div>

                  <h3 className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-accent-blue transition-colors duration-300 mb-2.5 leading-snug">
                    {project.title}
                  </h3>

                  {project.architecture && (
                    <div className="text-[10px] font-mono text-zinc-400 bg-white/[0.03] border border-white/5 px-2.5 py-1 rounded-lg mb-3 truncate">
                      {project.architecture}
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-zinc-400 text-xs leading-relaxed font-sans line-clamp-3 mb-4">
                    {project.description}
                  </p>

                  {/* Key Highlights Bullet Points if available */}
                  {project.features && project.features.length > 0 && (
                    <div className="space-y-1.5 mb-2">
                      {project.features.slice(0, 2).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-[11px] text-zinc-300 font-sans">
                          <span className="w-1 h-1 rounded-full bg-accent-blue mt-1.5 shrink-0" />
                          <span className="line-clamp-1 leading-snug">{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  {/* Tech Tags */}
                  <div className="px-6 py-3 flex flex-wrap gap-1.5 border-t border-white/5 bg-black/20">
                    {project.tags.slice(0, 4).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono text-zinc-400 bg-white/[0.03] px-2.5 py-0.5 rounded-md border border-white/5"
                      >
                        #{tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="text-[10px] font-mono text-zinc-500 px-1 py-0.5">
                        +{project.tags.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Card Footer Actions */}
                  <div className="p-4 bg-white/[0.02] border-t border-white/5 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-white flex items-center gap-1.5 transition-colors border border-white/10"
                    >
                      <Info className="w-3.5 h-3.5 text-accent-blue" />
                      <span>Specifications</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-zinc-400 hover:text-white rounded-xl hover:bg-white/5 transition-colors"
                          title="GitHub Repository"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-accent-blue hover:text-white rounded-xl hover:bg-accent-blue/20 transition-colors"
                          title="Live Demo"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 text-zinc-500 font-mono text-sm">
            No projects matched your search query "{searchQuery}".
          </div>
        )}
      </div>

      {/* Detailed Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
