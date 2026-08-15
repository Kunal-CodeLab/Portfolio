import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Bot, User, RefreshCw, FileText, Mail, Phone } from "lucide-react";
import { DEV_PROFILE } from "../data";

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  actions?: { label: string; action: string }[];
}

const CATEGORIZED_PROMPTS = [
  {
    category: "👔 For Recruiters",
    prompts: [
      "Why should we hire Kunal?",
      "Commercial Work & Freelance Clients",
      "Availability & Notice Period",
      "Salary & Relocation Flexibility"
    ]
  },
  {
    category: "💻 Tech & Projects",
    prompts: [
      "Tell me about SonicBoard (.NET 8)",
      "DevOps Infrastructure (Terraform/AWS)",
      "Python Intern at Codveda",
      "Technical Stack Overview"
    ]
  },
  {
    category: "🔗 Links & Actions",
    prompts: [
      "Open Resume PDF",
      "Contact Details & Email",
      "Education & Degree",
      "Certifications & CTF Badge"
    ]
  }
];

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategoryTab, setActiveCategoryTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "ai",
      text: `Hello! I'm Kunal's AI Twin, trained on his exact resume & production codebase. Ask me anything about his freelance work (Huzurr.com), Python internship at Codveda, .NET 8 desktop apps, DevOps pipelines, or hiring availability!`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      actions: [
        { label: "View Resume PDF", action: "resume" },
        { label: "Why Hire Kunal?", action: "why_hire" }
      ]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleActionClick = (act: string) => {
    if (act === "resume") {
      window.open(DEV_PROFILE.resumeUrl, "_blank");
      return;
    }
    if (act === "email") {
      navigator.clipboard.writeText(DEV_PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      return;
    }
    if (act === "call") {
      window.location.href = `tel:${DEV_PROFILE.phone}`;
      return;
    }
    if (act === "projects_scroll") {
      const element = document.getElementById("projects");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      setIsOpen(false);
      return;
    }
    if (act === "why_hire") {
      handleSendMessage("Why should we hire Kunal?");
      return;
    }
  };

  const generateKnowledgeBaseResponse = (query: string): { text: string; actions?: { label: string; action: string }[] } => {
    const q = query.toLowerCase();

    if (q.includes("why hire") || q.includes("standout") || q.includes("strength") || q.includes("why should we")) {
      return {
        text: `Kunal is a result-driven Full-Stack & Desktop Developer with commercial freelance experience building live production web apps (Huzurr.com, Jawaileopardsafaris.com) and high-performance C# .NET 8 desktop tools.\n\nKey Highlights from Resume:\n• Proven track record of improving Google PageSpeed web performance by 40%\n• Virtual Python Intern at Codveda Technologies (resolved 30+ software defects, 25% efficiency gain)\n• Experienced across Full Stack (React/Node/Flask), C# .NET 8 WPF, and DevOps Infrastructure (Terraform, Ansible, AWS EC2/VPC)\n• 6th Sem BCA student at Jaipur National University — Available Immediately!`,
        actions: [
          { label: "Open Resume PDF", action: "resume" },
          { label: "Contact Email", action: "email" }
        ]
      };
    }

    if (q.includes("freelance") || q.includes("client") || q.includes("huzurr") || q.includes("jawai") || q.includes("codveda") || q.includes("intern") || q.includes("work experience")) {
      return {
        text: `Kunal's Verified Work Experience:\n\n1. Freelance Full-Stack Developer (Self-Employed / Remote) [Feb 2025 – Present]:\n• Commercial Live Projects: Huzurr.com & Jawaileopardsafaris.com\n• Developed and deployed commercial client web apps, managing DNS, hosting, and security maintenance.\n• Boosted PageSpeed UI scores by 40%.\n\n2. Python Development Intern at Codveda Technologies [Aug 2025 – Sep 2025]:\n• Engineered modular Python backend components, increasing code execution efficiency by 25%.\n• Built automated testing routines resolving 30+ defects prior to staging build.`,
        actions: [
          { label: "View Projects Section", action: "projects_scroll" },
          { label: "Open Resume PDF", action: "resume" }
        ]
      };
    }

    if (q.includes("available") || q.includes("availability") || q.includes("notice") || q.includes("when can") || q.includes("join")) {
      return {
        text: `Kunal is AVAILABLE IMMEDIATELY for Internship and Full-Time Fresher Developer roles (Frontend, Backend, Full Stack, .NET Developer, or DevOps).\n\nHe has zero notice period and can start working right away!`,
        actions: [
          { label: "Copy Email Address", action: "email" },
          { label: "Call / WhatsApp", action: "call" }
        ]
      };
    }

    if (q.includes("reloc") || q.includes("remote") || q.includes("location") || q.includes("city") || q.includes("where")) {
      return {
        text: `Kunal is based in Jaipur, Rajasthan, India, and is 100% open to both Remote roles and Relocating to major IT hubs (Bangalore, NCR/Gurgaon, Pune, Hyderabad, Mumbai, Jaipur, etc.).`,
        actions: [
          { label: "Contact Details", action: "email" }
        ]
      };
    }

    if (q.includes("salary") || q.includes("stipend") || q.includes("ctc") || q.includes("remuneration") || q.includes("package")) {
      return {
        text: `Kunal is open to industry-standard fresher salaries and internship stipends according to company benchmarks and growth opportunities. His primary focus is joining an ambitious engineering team!`,
        actions: [
          { label: "Open Resume PDF", action: "resume" }
        ]
      };
    }

    if (q.includes("sonicboard") || q.includes("soundboard") || q.includes("c#") || q.includes(".net") || q.includes("wpf")) {
      return {
        text: `SonicBoard – Premium .NET 8 WPF Soundboard Application:\n• Built on C# .NET 8 with NAudio engine for WASAPI shared audio mixing.\n• Win32 Low-Level Keyboard Hooks (SetWindowsHookEx) for global system hotkeys with keypress suppression during gaming (Valorant, CS2).\n• Multi-device audio routing (headphones + virtual audio cable) with smart mic auto-mute.`,
        actions: [
          { label: "View Project in Portfolio", action: "projects_scroll" }
        ]
      };
    }

    if (q.includes("devops") || q.includes("terraform") || q.includes("ansible") || q.includes("aws") || q.includes("infrastructure")) {
      return {
        text: `Automated DevOps Infrastructure (IaC):\n• Architected Infrastructure as Code using Terraform & Ansible scripts to provision multi-AZ AWS VPC subnets & EC2 instances.\n• Automated Nginx web deployment with 99.9% uptime and 50% faster incident response using CloudWatch, Prometheus, & Grafana monitoring.`,
        actions: [
          { label: "View Projects Section", action: "projects_scroll" }
        ]
      };
    }

    if (q.includes("gitauto") || q.includes("git auto") || q.includes("push") || q.includes("workspace")) {
      return {
        text: `GitAuto-Push – Developer Workspace Automation Utility:\n• Built with Node.js, JavaScript & Git API with a glassmorphic dashboard.\n• Automatically tracks local repo changes and performs background commits & pushes, reducing manual developer effort by 40%.`,
        actions: [
          { label: "View Projects Section", action: "projects_scroll" }
        ]
      };
    }

    if (q.includes("stack") || q.includes("skill") || q.includes("technolog") || q.includes("python") || q.includes("react")) {
      return {
        text: `Kunal's Technical Stack Breakdown (Verified Resume):\n\n• Languages: C# (.NET 8), JavaScript (ES6+), TypeScript, Python, HTML5, CSS3, PHP, SQL\n• Frameworks: WPF, Node.js, Express.js, React.js, PyQt5, C# Windows Forms, WordPress\n• DevOps & Cloud: AWS (EC2, VPC, S3, CloudWatch), Terraform, Ansible, Docker, Nginx, CI/CD, Prometheus, Grafana\n• Audio/System: NAudio Engine, Win32 API Hooks, WASAPI Routing, Multi-Threading\n• Databases: MySQL, SQLite`,
        actions: [
          { label: "Open Resume PDF", action: "resume" }
        ]
      };
    }

    if (q.includes("education") || q.includes("degree") || q.includes("college") || q.includes("university") || q.includes("bca")) {
      return {
        text: `Academic Qualifications:\n• Bachelor of Computer Applications (BCA) - Computer Science (2023 – 2026), Jaipur National University, Jaipur.\n• Senior Secondary (XII) - Science Stream (2023), Maharana Pratap School, Jaipur.\n• Secondary (X) (2021), The Learners Academy, Jaipur.`,
        actions: [
          { label: "Open Resume PDF", action: "resume" }
        ]
      };
    }

    if (q.includes("certif") || q.includes("hackathon") || q.includes("ctf") || q.includes("achievement")) {
      return {
        text: `Certifications & Achievements:\n• Responsive Web Design Certification (300 Hours) – freeCodeCamp (Oct 2024)\n• Free DevOps Course Certification (CI/CD & Cloud) – IntelliPaat Academy (Aug 2025)\n• CSS (Basic) Skill Certification – HackerRank (Oct 2024)\n• Capture The Flag (CTF) Cybersecurity Hackathon Badge – CyberCure Technologies (Sep 2025)\n• Python Development Internship Training – Codveda Technologies (Sep 2025)`,
        actions: [
          { label: "Open Resume PDF", action: "resume" }
        ]
      };
    }

    if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("number") || q.includes("reach")) {
      return {
        text: `Contact Coordinates:\nEmail: ${DEV_PROFILE.email}\nPhone/WhatsApp: ${DEV_PROFILE.phone}\nLinkedIn: ${DEV_PROFILE.linkedin}\nGitHub: ${DEV_PROFILE.github}`,
        actions: [
          { label: "Copy Email", action: "email" },
          { label: "Call / WhatsApp", action: "call" },
          { label: "Open Resume PDF", action: "resume" }
        ]
      };
    }

    return {
      text: `Kunal Choudhary is a result-driven Full-Stack & Desktop Developer (BCA 6th Sem, JNU Jaipur) with commercial freelance experience (Huzurr.com) and internship experience at Codveda. He is Available Immediately for remote or on-site roles!`,
      actions: [
        { label: "Open Resume PDF", action: "resume" },
        { label: "Why Hire Kunal?", action: "why_hire" }
      ]
    };
  };

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputMessage;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInputMessage("");
    setIsLoading(true);

    try {
      const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || (window as any).GEMINI_API_KEY;

      if (apiKey) {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [
                    {
                      text: `You are Kunal Choudhary's AI Portfolio Twin. Answer professionally as Kunal's representative.
Kunal's Verified Resume Summary:
- Full-Stack Developer & BCA 6th Sem Student at Jaipur National University (2023-2026).
- Freelance Work: Developed commercial live apps (Huzurr.com, Jawaileopardsafaris.com), boosting PageSpeed UI scores by 40%.
- Python Intern at Codveda Technologies (resolved 30+ defects, 25% efficiency boost).
- Key Projects: SonicBoard (.NET 8 WPF, NAudio, Win32 Hooks), GitAuto-Push (Node.js workspace automation), Automated DevOps (Terraform, Ansible, AWS EC2/VPC, CloudWatch), Smart File Management (C# .NET), Forensic Tool (PyQt5).
- Availability: Available Immediately, open to Remote and Relocating.
- Contact: Email (kunal.codes5@gmail.com), Phone (+91 6377470431).

User Question: ${textToSend}`
                    }
                  ]
                }
              ]
            })
          }
        );

        if (response.ok) {
          const data = await response.json();
          const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (aiText) {
            setMessages((prev) => [
              ...prev,
              {
                id: (Date.now() + 1).toString(),
                sender: "ai",
                text: aiText,
                timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                actions: [
                  { label: "Open Resume PDF", action: "resume" },
                  { label: "Copy Email", action: "email" }
                ]
              }
            ]);
            setIsLoading(false);
            return;
          }
        }
      }

      setTimeout(() => {
        const kbResponse = generateKnowledgeBaseResponse(textToSend);
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "ai",
            text: kbResponse.text,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            actions: kbResponse.actions
          }
        ]);
        setIsLoading(false);
      }, 400);

    } catch (err) {
      console.error("AI Error:", err);
      const kbResponse = generateKnowledgeBaseResponse(textToSend);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "ai",
          text: kbResponse.text,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          actions: kbResponse.actions
        }
      ]);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-gradient-to-r from-accent-purple via-accent-blue to-cyber-teal text-white font-mono text-xs font-bold shadow-2xl hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all duration-300 border border-white/20"
        >
          <span className="hidden sm:inline">Ask Kunal's AI</span>
          <MessageSquare className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-teal opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyber-teal"></span>
          </span>
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[440px] max-h-[620px] h-[82vh] bg-charcoal/95 border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col backdrop-blur-xl"
          >
            <div className="p-4 bg-obsidian/90 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-accent-purple to-accent-blue flex items-center justify-center text-white shadow-md">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-extrabold text-white flex items-center gap-1.5">
                    Kunal's AI Twin
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyber-teal/10 text-cyber-teal border border-cyber-teal/20 uppercase">
                      Verified Resume
                    </span>
                  </h4>
                  <p className="text-[10px] font-mono text-zinc-400">
                    Trained on freelance work & production projects
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() =>
                    setMessages([
                      {
                        id: "welcome",
                        sender: "ai",
                        text: `Chat reset. Ask me anything about Kunal!`,
                        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                        actions: [
                          { label: "View Resume PDF", action: "resume" },
                          { label: "Why Hire Kunal?", action: "why_hire" }
                        ]
                      }
                    ])
                  }
                  className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                  title="Clear Chat"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-obsidian/40">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${
                    msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs ${
                      msg.sender === "user"
                        ? "bg-accent-blue text-white"
                        : "bg-accent-purple/20 text-accent-purple border border-accent-purple/30"
                    }`}
                  >
                    {msg.sender === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                  </div>

                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-xs font-sans leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-accent-blue text-white rounded-tr-none"
                        : "bg-white/5 border border-white/10 text-zinc-200 rounded-tl-none"
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>

                    {msg.actions && msg.actions.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3 pt-2 border-t border-white/10">
                        {msg.actions.map((act, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleActionClick(act.action)}
                            className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[10px] font-mono font-semibold text-white border border-white/10 flex items-center gap-1 transition-all"
                          >
                            {act.action === "resume" && <FileText className="w-3 h-3 text-accent-blue" />}
                            {act.action === "email" && <Mail className="w-3 h-3 text-cyber-teal" />}
                            {act.action === "call" && <Phone className="w-3 h-3 text-accent-purple" />}
                            <span>{act.action === "email" && copied ? "Copied!" : act.label}</span>
                          </button>
                        ))}
                      </div>
                    )}

                    <span
                      className={`block text-[9px] font-mono mt-1.5 text-right ${
                        msg.sender === "user" ? "text-blue-200" : "text-zinc-500"
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 p-2">
                  <Bot className="w-4 h-4 text-accent-purple animate-pulse" />
                  <span>AI Twin is checking Kunal's resume data...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="p-2.5 bg-obsidian/90 border-t border-white/10 flex flex-col gap-2">
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-1">
                {CATEGORIZED_PROMPTS.map((cat, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveCategoryTab(idx)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold whitespace-nowrap transition-all ${
                      activeCategoryTab === idx
                        ? "bg-accent-blue text-white shadow-sm"
                        : "text-zinc-400 hover:text-white bg-white/5"
                    }`}
                  >
                    {cat.category}
                  </button>
                ))}
              </div>

              <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
                {CATEGORIZED_PROMPTS[activeCategoryTab].prompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(prompt)}
                    className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-mono text-zinc-300 hover:text-white whitespace-nowrap transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 bg-obsidian border-t border-white/10 flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask about Huzurr.com, .NET 8, availability..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs font-sans text-white placeholder-zinc-500 focus:outline-none focus:border-accent-blue transition-colors"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim() || isLoading}
                className="p-2.5 rounded-xl bg-accent-blue text-white hover:bg-accent-blue/90 disabled:opacity-50 transition-all shadow-md"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
