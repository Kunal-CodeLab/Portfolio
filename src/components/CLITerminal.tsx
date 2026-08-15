import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Terminal as TerminalIcon, X, Maximize2, Minimize2 } from "lucide-react";
import { DEV_PROFILE, SKILL_CATEGORIES, PROJECTS } from "../data";

interface CLITerminalProps {
  onClose: () => void;
}

interface CommandOutput {
  id: string;
  type: "input" | "output" | "system";
  text: string;
}

export default function CLITerminal({ onClose }: CLITerminalProps) {
  const [input, setInput] = useState("");
  const [isMaximized, setIsMaximized] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const [lines, setLines] = useState<CommandOutput[]>([
    {
      id: "welcome-1",
      type: "system",
      text: "KUNAL CHOUDHARY INTERACTIVE CLI TERMINAL [Version 2.4.0-release]"
    },
    {
      id: "welcome-2",
      type: "system",
      text: "Type 'help' to view available commands. Press 'Ctrl + K' or 'exit' to close."
    }
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const newLines: CommandOutput[] = [
      ...lines,
      { id: Date.now().toString(), type: "input", text: trimmed }
    ];

    const cmdLower = trimmed.toLowerCase();

    switch (cmdLower) {
      case "help":
        newLines.push({
          id: (Date.now() + 1).toString(),
          type: "output",
          text: `AVAILABLE COMMANDS:
  • bio       - View Kunal's background & career snapshot
  • skills    - Display technical skills breakdown
  • projects  - List featured projects & repositories
  • contact   - Get direct email & phone details
  • resume    - Open Google Drive Resume PDF
  • clear     - Clear terminal screen
  • exit      - Close terminal modal`
        });
        break;

      case "bio":
      case "about":
        newLines.push({
          id: (Date.now() + 1).toString(),
          type: "output",
          text: `BIO SNAPSHOT:
Name: ${DEV_PROFILE.name}
Role: ${DEV_PROFILE.title}
Status: ${DEV_PROFILE.location}
BCA 6th Sem | Jaipur National University, Jaipur
Full-Stack & Desktop Software Developer (.NET 8 WPF, Python, AWS, DevOps)`
        });
        break;

      case "skills":
      case "stack":
        const skillsText = SKILL_CATEGORIES.map(
          (cat) => `[${cat.title}] => ${cat.skills.map((s) => s.name).join(", ")}`
        ).join("\n");
        newLines.push({
          id: (Date.now() + 1).toString(),
          type: "output",
          text: `TECHNICAL PROFICIENCY:\n${skillsText}`
        });
        break;

      case "projects":
      case "work":
        const projText = PROJECTS.map(
          (p) => `• ${p.title} (${p.category})\n  Tech: ${p.tags.join(", ")}`
        ).join("\n\n");
        newLines.push({
          id: (Date.now() + 1).toString(),
          type: "output",
          text: `FEATURED PROJECTS:\n${projText}`
        });
        break;

      case "contact":
      case "email":
        newLines.push({
          id: (Date.now() + 1).toString(),
          type: "output",
          text: `CONTACT COORDINATES:
  Email: ${DEV_PROFILE.email}
  Phone: ${DEV_PROFILE.phone}
  GitHub: ${DEV_PROFILE.github}
  LinkedIn: ${DEV_PROFILE.linkedin}`
        });
        break;

      case "resume":
        window.open(DEV_PROFILE.resumeUrl, "_blank");
        newLines.push({
          id: (Date.now() + 1).toString(),
          type: "output",
          text: `Opening resume PDF in new tab...`
        });
        break;

      case "clear":
      case "cls":
        setLines([]);
        setInput("");
        return;

      case "exit":
      case "quit":
        onClose();
        return;

      default:
        newLines.push({
          id: (Date.now() + 1).toString(),
          type: "output",
          text: `Command not recognized: '${trimmed}'. Type 'help' for options.`
        });
        break;
    }

    setLines(newLines);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx < history.length) {
        setHistoryIndex(nextIdx);
        setInput(history[history.length - 1 - nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInput(history[history.length - 1 - nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
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
        className={`relative z-10 w-full ${
          isMaximized ? "max-w-[98vw] h-[94vh]" : "max-w-3xl h-[520px]"
        } bg-obsidian border border-white/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col font-mono text-xs transition-all duration-300`}
      >
        <div className="px-4 py-3 bg-charcoal border-b border-white/10 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer" onClick={onClose} />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80 cursor-pointer" onClick={() => setIsMaximized(!isMaximized)} />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-2 text-zinc-400 text-[11px] font-semibold flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-accent-blue" />
              kunal@portfolio-cli:~
            </span>
          </div>

          <div className="flex items-center gap-2 text-zinc-400">
            <button onClick={() => setIsMaximized(!isMaximized)} className="hover:text-white">
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button onClick={onClose} className="hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-3 custom-scrollbar text-zinc-300">
          {lines.map((line) => (
            <div key={line.id}>
              {line.type === "input" ? (
                <div className="flex items-center gap-2 text-accent-blue font-bold">
                  <span>kunal@dev-box:~$</span>
                  <span className="text-white">{line.text}</span>
                </div>
              ) : line.type === "system" ? (
                <div className="text-cyber-teal font-semibold">{line.text}</div>
              ) : (
                <pre className="whitespace-pre-wrap font-mono text-zinc-300 leading-relaxed font-normal">
                  {line.text}
                </pre>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <div className="p-3 bg-charcoal/50 border-t border-white/10 flex items-center gap-2">
          <span className="text-accent-blue font-bold">kunal@dev-box:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-white focus:outline-none font-mono text-xs"
            placeholder="Type 'help', 'bio', 'projects', 'resume'..."
            autoFocus
          />
        </div>
      </motion.div>
    </div>
  );
}
