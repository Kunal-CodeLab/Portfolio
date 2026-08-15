import { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import BentoAbout from "./components/BentoAbout";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AIChatbot from "./components/AIChatbot";
import RecruiterModal from "./components/RecruiterModal";
import CLITerminal from "./components/CLITerminal";

export default function App() {
  const [recruiterModalOpen, setRecruiterModalOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-obsidian text-zinc-100 font-sans selection:bg-accent-blue selection:text-white relative">
      <Header onOpenTerminal={() => setTerminalOpen(true)} />
      
      <main>
        <Hero onOpenRecruiterModal={() => setRecruiterModalOpen(true)} />
        <BentoAbout />
        <Projects />
        <Education />
        <Contact />
      </main>

      <Footer />

      {/* Floating AI Assistant Chatbot */}
      <AIChatbot />

      {/* 30-Second Recruiter Pitch Modal */}
      {recruiterModalOpen && (
        <RecruiterModal onClose={() => setRecruiterModalOpen(false)} />
      )}

      {/* Interactive Developer CLI Terminal Modal (Ctrl + K) */}
      {terminalOpen && (
        <CLITerminal onClose={() => setTerminalOpen(false)} />
      )}
    </div>
  );
}
