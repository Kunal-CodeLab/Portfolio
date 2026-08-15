import { useState } from "react";
import { motion } from "motion/react";
import { GraduationCap, Award, Calendar, BookOpen, ExternalLink, Bookmark, MapPin } from "lucide-react";
import { EDUCATION_TIMELINE, CERTIFICATIONS } from "../data";

export default function Education() {
  const [hoveredCert, setHoveredCert] = useState<string | null>(null);

  return (
    <>
      {/* 1. Dedicated Education Section */}
      <section id="education" className="py-24 bg-charcoal/40 dot-bg border-t border-cyber-teal/5 relative">
        {/* Decorative subtle ambient glows */}
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-accent-purple/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Section Headline */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-xs font-mono font-semibold tracking-[0.2em] text-accent-purple uppercase block mb-3">
                Formal Academic Path
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                Education Timeline<span className="text-accent-purple">.</span>
              </h2>
            </div>
            <p className="max-w-md text-zinc-400 text-sm leading-relaxed font-sans">
              A record of my academic training, specialization in computer applications, and foundations in technology.
            </p>
          </div>

          {/* Education Grid - 3 Full visual cards representing the timeline milestones */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {EDUCATION_TIMELINE.map((edu, idx) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-panel rounded-3xl p-8 relative overflow-hidden group border border-white/5 hover:border-white/10 hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-all flex flex-col justify-between"
              >
                {/* Background highlight glow on hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent-purple/5 to-transparent rounded-full blur-2xl pointer-events-none" />

                <div>
                  {/* Card Header Info */}
                  <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-white/5">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-mono text-zinc-300 uppercase">
                      <Calendar className="w-3.5 h-3.5 text-accent-purple" />
                      <span>{edu.period}</span>
                    </div>
                    <span className="text-[9px] uppercase font-mono font-extrabold tracking-wider text-accent-purple bg-accent-purple/10 px-2.5 py-0.5 rounded-md border border-accent-purple/20">
                      {edu.id === "edu-1" ? "Active Degree" : "Graduated"}
                    </span>
                  </div>

                  {/* Degree Name */}
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-accent-purple transition-colors duration-300 leading-snug">
                    {edu.degree}
                  </h3>

                  {/* Institution Details */}
                  <div className="flex flex-col gap-1.5 mb-6 text-xs sm:text-sm text-zinc-400 font-sans">
                    <div className="flex items-center gap-2 text-accent-blue font-mono font-semibold uppercase tracking-wider">
                      <BookOpen className="w-4 h-4 shrink-0" />
                      <span>{edu.institution}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 font-mono mt-1">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span>{edu.location}</span>
                    </div>
                  </div>

                  {/* Coursework description */}
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                    {edu.description}
                  </p>
                </div>

                {/* Grade display (conditional for active BCA) */}
                {edu.id === "edu-1" && (
                  <div className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl flex items-center justify-between text-xs font-mono text-zinc-300 mt-auto">
                    <span className="text-[10px] uppercase text-zinc-500 tracking-wide">Academic Status</span>
                    <span className="text-cyber-teal font-extrabold">{edu.grade}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Dedicated Certifications Section */}
      <section id="certifications" className="py-24 bg-charcoal/30 border-t border-white/5 relative">
        {/* Subtle decorative glowing background */}
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-accent-blue/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Section Headline */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-xs font-mono font-semibold tracking-[0.2em] text-accent-blue uppercase block mb-3">
                Verified Skill Assessments
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                Technical Certifications<span className="text-accent-blue">.</span>
              </h2>
            </div>
            <p className="max-w-md text-zinc-400 text-sm leading-relaxed font-sans">
              A comprehensive curation of evaluated credentials, specialized courses, and engineering micro-degrees.
            </p>
          </div>

          {/* Certifications Grid (Sleek responsive architecture) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CERTIFICATIONS.map((cert, idx) => (
              <motion.a
                key={idx}
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                onMouseEnter={() => setHoveredCert(idx.toString())}
                onMouseLeave={() => setHoveredCert(null)}
                className="glass-panel rounded-2xl p-6 border border-white/5 hover:border-white/12 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden hover:shadow-[0_8px_25px_rgba(30,144,255,0.1)]"
              >
                {/* Micro visual highlight background gradients triggered on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/[0.03] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="flex items-start gap-4 relative z-10 mb-6">
                  {/* Certificate Icon Container */}
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-accent-blue group-hover:text-accent-purple group-hover:bg-accent-blue/10 transition-all duration-300">
                    <Bookmark className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-white text-base font-bold font-display leading-snug group-hover:text-accent-blue transition-colors duration-300 line-clamp-2">
                      {cert.name}
                    </h3>
                    <p className="text-xs text-zinc-500 font-mono mt-1">
                      {cert.issuer}
                    </p>
                  </div>
                </div>

                {/* Card Footer row showcasing the date & button trigger */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5 relative z-10">
                  <div className="flex items-center gap-1.5 text-zinc-500 font-mono text-[10px]">
                    <Calendar className="w-3.5 h-3.5 text-zinc-600" />
                    <span>{cert.date}</span>
                  </div>

                  <div className="flex items-center gap-1 text-[10px] font-mono font-medium text-accent-blue group-hover:text-white transition-colors duration-300">
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
