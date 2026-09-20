import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Bot, User, RefreshCw, FileText, Mail, Phone, ExternalLink } from "lucide-react";
import { DEV_PROFILE } from "../data";

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  actions?: { label: string; action: string; url?: string }[];
}

const CATEGORIZED_PROMPTS = [
  {
    category: "Recruiter Inquiries",
    prompts: [
      "Why should we hire Kunal?",
      "Commercial Work & Freelance Clients",
      "Availability & Notice Period",
      "Salary & Relocation Flexibility"
    ]
  },
  {
    category: "Featured Projects",
    prompts: [
      "Tell me about SmartOffice Workflow Manager",
      "Tell me about ForensiX Pro (DFIR)",
      "Tell me about Insider Threat Detection",
      "Tell me about SonicBoard (.NET 8)",
      "DevOps Infrastructure (Terraform/AWS)"
    ]
  },
  {
    category: "Quick Actions",
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
      text: `Hello! I am Kunal's AI Twin, trained directly on his verified resume, freelance delivery (Huzurr.com), Python internship at Codveda, and production software architecture (.NET 8 WPF, ForensiX Pro, DevOps pipelines).\n\nFeel free to select a prompt below or ask any technical or recruiter question!`,
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

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleActionClick = (act: string, url?: string) => {
    if (act === "resume") {
      window.open(DEV_PROFILE.resumeUrl, "_blank");
      return;
    }
    if (act === "url" && url) {
      window.open(url, "_blank");
      return;
    }
    if (act === "email") {
      navigator.clipboard.writeText(DEV_PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      return;
    }
    if (act === "call") {
      window.location.href = `tel:${DEV_PROFILE.phone.replace(/\s+/g, '')}`;
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

  const generateKnowledgeBaseResponse = (query: string): { text: string; actions?: { label: string; action: string; url?: string }[] } => {
    const q = query.toLowerCase();

    // 1. SmartOffice Workflow Manager
    if (q.includes("smartoffice") || q.includes("smart office") || q.includes("workflow manager") || (q.includes("workflow") && !q.includes("experience"))) {
      return {
        text: `SmartOffice Workflow Manager — Enterprise Desktop Workflow Suite:\n\n• Tech Stack: C# .NET 8.0, WPF Modern XAML, Clean Architecture (MVVM), SQLite WAL Engine, Microsoft.Extensions.Hosting\n• Multi-View Task Ecosystem: High-density DataGrid, 5-Stage Drag-and-Drop Kanban Board, and 42-Cell Monthly Calendar.\n• Real-Time SLA Engine: Configurable SLA countdowns (4h to 72h) with a background Hosted Service scanning every 30 seconds for automated escalation.\n• Executive Intelligence Hub: 4 pre-built report templates (Summary, Throughput, SLA Risk, Audit) with HTML preview & CSV/HTML exports.\n• Forensic Audit Trail: Immutable mutation log tracking operator ID, action types, UTC timestamps, and diff snapshots.`,
        actions: [
          { label: "View on GitHub", action: "url", url: "https://github.com/Kunal-CodeLab/Smart-Office-Workflow" },
          { label: "Projects Section", action: "projects_scroll" }
        ]
      };
    }

    // 2. ForensiX Pro
    if (q.includes("forensix") || q.includes("forensic") || q.includes("incident response") || q.includes("dfir")) {
      return {
        text: `ForensiX Pro — Digital Forensics & Incident Response Suite:\n\n• Tech Stack: Python 3.8+, PyQt5 Modern GUI, Low-Level NTFS/MFT & Binary Parsers, PowerShell .evtx Pipeline, SQLite Shadow Buffers, SHA-256 Engine\n• Windows Binary $I/$R Recycle Bin Parser: Recovers original file paths, FILETIME 64-bit timestamps, and direct 1-click restore.\n• Multi-Browser Extractor: Non-locking shadow-buffer SQLite extraction across Chrome, Edge, Firefox, Brave, and Opera.\n• Windows Event Log Parser (.evtx): High-speed extraction of Application, Security, and System logs via PowerShell pipelines.\n• Chain of Custody: Chunked SHA-256 evidence hashing and court-ready HTML/CSV reporting.`,
        actions: [
          { label: "View on GitHub", action: "url", url: "https://github.com/Kunal-CodeLab/ForensiX-Pro" },
          { label: "Projects Section", action: "projects_scroll" }
        ]
      };
    }

    // 3. Insider Threat Detection System
    if (q.includes("threat") || q.includes("insider") || q.includes("detection") || q.includes("telemetry") || q.includes("security")) {
      return {
        text: `Windows Insider Threat Detection System — Behavioral Endpoint Intelligence:\n\n• Tech Stack: Python 3.9+, Flask, Psutil, Win32 APIs, SQLite, Bootstrap 5 Dashboard\n• Endpoint Monitoring Agent: Lightweight background worker capturing process creations, mass file alterations (>50 files/min), and USB device connections via WMI / Win32 APIs.\n• Heuristic Risk Scoring Engine: Dynamic threat score (0-100) based on weighted anomaly rules (e.g. command shell spawning from Office binaries, shadow copy deletions).\n• Incident Investigation Console: Searchable audit logs with severity classification (LOW, MEDIUM, HIGH, CRITICAL) and CSV forensic exports.`,
        actions: [
          { label: "View on GitHub", action: "url", url: "https://github.com/Kunal-CodeLab/Insider-Threat-Detection-System" },
          { label: "Projects Section", action: "projects_scroll" }
        ]
      };
    }

    // 4. SonicBoard
    if (q.includes("sonicboard") || q.includes("soundboard") || (q.includes(".net") && q.includes("sound")) || q.includes("naudio")) {
      return {
        text: `SonicBoard — Low-Latency .NET 8 Soundboard Software:\n\n• Tech Stack: C# .NET 8.0, WPF, NAudio Audio Engine, Win32 User32.dll Hooks\n• WASAPI Audio Mixing: Low-latency shared mode audio stream playback with dynamic volume curves.\n• Global System Hotkeys: Low-level Win32 keyboard hooks (SetWindowsHookEx) ensuring reliable execution even inside full-screen games (Valorant, CS2).\n• Dual-Device Routing: Simultaneously streams sound to user headphones and a virtual microphone cable.`,
        actions: [
          { label: "View on GitHub", action: "url", url: "https://github.com/Kunal-CodeLab/SonicBoard" },
          { label: "Projects Section", action: "projects_scroll" }
        ]
      };
    }

    // 5. DevOps & Cloud Infrastructure
    if (q.includes("devops") || q.includes("terraform") || q.includes("ansible") || q.includes("aws") || q.includes("infrastructure") || q.includes("cloud")) {
      return {
        text: `Automated DevOps Infrastructure (IaC):\n\n• Tech Stack: Terraform, Ansible, AWS (EC2, VPC, S3, CloudWatch), Nginx, Prometheus, Grafana\n• Infrastructure as Code: Terraform modules provisioning multi-AZ VPC, private/public subnets, security groups, and EC2 instances.\n• Automated Configuration: Ansible playbooks configuring hardened Nginx reverse proxies with automated SSL and health check routines.\n• Observability: Centralized Prometheus metric scraping and Grafana dashboards for CPU, memory, and network throughput monitoring.`,
        actions: [
          { label: "View on GitHub", action: "url", url: "https://github.com/Kunal-CodeLab/AWS-IAC-TERRAFORM-ANSIBLE-PROJECT" },
          { label: "Projects Section", action: "projects_scroll" }
        ]
      };
    }

    // 6. Why Hire
    if (q.includes("why hire") || q.includes("standout") || q.includes("strength") || q.includes("why should we")) {
      return {
        text: `Why Kunal stands out for Software Engineering & DevOps roles:\n\n1. Real Commercial Delivery: Delivered live client production websites (Huzurr.com, Jawaileopardsafaris.com) and boosted PageSpeed performance by 40%.\n2. Strong Multi-Discipline Engineering: Proficient in C# .NET 8 (Clean Architecture/MVVM), Python backend systems, and automated DevOps infrastructure (AWS/Terraform/Ansible).\n3. Verified Industry Internship: Resolved 30+ defects and improved execution efficiency by 25% during Python internship at Codveda Technologies.\n4. Immediate Availability: BCA 6th Sem student available immediately for full-time fresher or internship roles with zero notice period.`,
        actions: [
          { label: "Open Resume PDF", action: "resume" },
          { label: "Contact Kunal", action: "email" }
        ]
      };
    }

    // 7. Freelance & Commercial Experience
    if (q.includes("freelance") || q.includes("client") || q.includes("huzurr") || q.includes("jawai") || q.includes("codveda") || q.includes("intern") || q.includes("work experience")) {
      return {
        text: `Kunal's Verified Work & Commercial Experience:\n\n1. Freelance Full-Stack Developer (Remote / Self-Employed) [Feb 2025 – Present]:\n• Delivered production web applications including Huzurr.com and Jawaileopardsafaris.com.\n• Handled complete lifecycle: architecture design, responsive frontend, DNS routing, and web security.\n• Optimized Core Web Vitals resulting in 40% faster load times.\n\n2. Python Development Intern at Codveda Technologies [Aug 2025 – Sep 2025]:\n• Developed modular backend scripts and automation testing suites.\n• Resolved 30+ defects prior to staging releases, boosting execution efficiency by 25%.`,
        actions: [
          { label: "View Projects Section", action: "projects_scroll" },
          { label: "Open Resume PDF", action: "resume" }
        ]
      };
    }

    // 8. Availability & Location
    if (q.includes("available") || q.includes("availability") || q.includes("notice") || q.includes("when can") || q.includes("join")) {
      return {
        text: `Kunal is AVAILABLE IMMEDIATELY for Software Engineer, Full-Stack, .NET Developer, or DevOps Engineer roles.\n\n• Notice Period: Immediate / Zero Days\n• Location: Jaipur, Rajasthan (Open to Relocation across India & Remote Roles)\n• Graduation: BCA (2023 - 2026), 6th Semester at Jaipur National University.`,
        actions: [
          { label: "Copy Email Address", action: "email" },
          { label: "Call / WhatsApp", action: "call" }
        ]
      };
    }

    if (q.includes("reloc") || q.includes("remote") || q.includes("location") || q.includes("city") || q.includes("where")) {
      return {
        text: `Kunal is based in Jaipur, Rajasthan, India, and is 100% open to:\n• Remote software engineering roles worldwide\n• On-site / hybrid relocation to major tech hubs (Bangalore, Gurgaon / NCR, Pune, Hyderabad, Mumbai, Jaipur, Noida).`,
        actions: [
          { label: "Contact Coordinates", action: "email" }
        ]
      };
    }

    // 9. Salary
    if (q.includes("salary") || q.includes("stipend") || q.includes("ctc") || q.includes("remuneration") || q.includes("package")) {
      return {
        text: `Kunal is open to competitive fresher industry standard packages and internship stipends aligned with company benchmarks. His core priority is contributing to impactful, high-scale engineering challenges!`,
        actions: [
          { label: "Open Resume PDF", action: "resume" },
          { label: "Direct Email", action: "email" }
        ]
      };
    }

    // 10. Tech Stack & Skills
    if (q.includes("stack") || q.includes("skill") || q.includes("technolog") || q.includes("python") || q.includes("react") || q.includes("c#")) {
      return {
        text: `Kunal's Core Technical Capabilities:\n\n• Core Languages: C# (.NET 8), Python 3.x, JavaScript (ES6+), TypeScript, HTML5, CSS3, PHP, SQL\n• Frameworks & Architecture: WPF / XAML, MVVM, Clean Architecture, React, Node.js, Express, Flask, PyQt5\n• DevOps & Cloud: AWS (EC2, VPC, S3, CloudWatch), Terraform, Ansible, Docker, Nginx, Prometheus, Grafana, Git/GitHub Actions\n• Systems & Low-Level: Win32 API Hooks, NAudio Engine, Binary Parsing ($I/$R), SQLite WAL Engine\n• Databases: MySQL, SQLite`,
        actions: [
          { label: "Open Resume PDF", action: "resume" }
        ]
      };
    }

    // 11. Education
    if (q.includes("education") || q.includes("degree") || q.includes("college") || q.includes("university") || q.includes("bca") || q.includes("academic")) {
      return {
        text: `Formal Academic Record:\n\n• Bachelor of Computer Applications (BCA) [2023 – 2026]: Jaipur National University, Jaipur (6th Semester / Active)\n• Senior Secondary (XII) Science Stream [2023]: Maharana Pratap School, Jaipur\n• Secondary (X) [2021]: The Learners Academy, Jaipur`,
        actions: [
          { label: "Open Resume PDF", action: "resume" }
        ]
      };
    }

    // 12. Certifications
    if (q.includes("certif") || q.includes("hackathon") || q.includes("ctf") || q.includes("achievement")) {
      return {
        text: `Verified Certifications & Accreditations:\n\n• Responsive Web Design Certification (300 Hours) – freeCodeCamp (Oct 2024)\n• Free DevOps Course Certification (CI/CD & Cloud) – IntelliPaat Academy (Aug 2025)\n• CSS (Basic) Skill Certification – HackerRank (Oct 2024)\n• Capture The Flag (CTF) Cybersecurity Hackathon Badge – CyberCure Technologies (Sep 2025)\n• Python Internship Completion Certificate – Codveda Technologies (Sep 2025)`,
        actions: [
          { label: "Open Resume PDF", action: "resume" }
        ]
      };
    }

    // 13. Contact
    if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("number") || q.includes("reach") || q.includes("linkedin") || q.includes("github")) {
      return {
        text: `Direct Contact Coordinates:\n\n• Email: ${DEV_PROFILE.email}\n• Phone: ${DEV_PROFILE.phone}\n• GitHub: ${DEV_PROFILE.github}\n• LinkedIn: ${DEV_PROFILE.linkedin}\n• Status: Available Immediately`,
        actions: [
          { label: "Copy Email", action: "email" },
          { label: "Call / WhatsApp", action: "call" },
          { label: "Open Resume PDF", action: "resume" }
        ]
      };
    }

    return {
      text: `Kunal Choudhary is a Full-Stack & Desktop Software Developer (BCA 6th Sem, JNU Jaipur) with commercial freelance experience (Huzurr.com, Jawaileopardsafaris.com), verified internship experience at Codveda, and robust projects in C# .NET 8, Python DFIR, and DevOps infrastructure. He is Available Immediately for hire!`,
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
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [
                    {
                      text: `You are Kunal Choudhary's AI Portfolio Twin. Answer professionally, accurately, and concisely as Kunal's official technical representative.
Rules:
- NEVER use emojis in your responses.
- Format responses cleanly with concise bullet points and bold technical terms.
- Highlight verified achievements with exact metrics (e.g. 40% performance boost, 30+ defects resolved).

Kunal's Profile & Resume:
- Name: Kunal Choudhary | Role: Full-Stack, Desktop & DevOps Software Engineer
- Education: Bachelor of Computer Applications (BCA 6th Sem, 2023-2026), Jaipur National University, Jaipur.
- Freelance Experience: Built commercial client web apps (Huzurr.com, Jawaileopardsafaris.com), improving PageSpeed performance by 40%.
- Internship: Python Developer Intern at Codveda Technologies (resolved 30+ defects, improved execution efficiency by 25%).
- Core Projects:
  1. SmartOffice Workflow Manager (C# .NET 8, WPF XAML, MVVM, SQLite WAL, SLA countdown background worker, 5-stage Kanban, 42-cell Calendar, diff-based forensic audit trail).
  2. ForensiX Pro Incident Response Suite (Python 3.8+, PyQt5 GUI, Binary $I/$R Recycle Bin parser, non-locking SQLite browser history extraction, Windows .evtx event log pipeline, SHA-256 custody hashing).
  3. Windows Insider Threat Detection System (Python, Flask, Psutil/Win32 APIs, mass file modification heuristic, high-risk process tree anomaly detection, real-time risk scoring).
  4. SonicBoard (.NET 8 WPF, NAudio WASAPI shared audio mixing, Win32 SetWindowsHookEx hotkey hooks).
  5. Automated DevOps Infrastructure (Terraform, Ansible, AWS EC2, VPC, Nginx, Prometheus, Grafana, CloudWatch).
- Availability: Available Immediately, open to Remote and Relocation across major IT hubs.
- Contact: Email (kunal.codes5@gmail.com), Phone (+91 6377470431), GitHub (https://github.com/Kunal-CodeLab), LinkedIn (https://linkedin.com/in/kunal-choudhary-it).

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
          const rawAiText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawAiText) {
            // Ensure no emojis in AI output
            const cleanedText = rawAiText.replace(/[\u{1F600}-\u{1F6FF}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');
            setMessages((prev) => [
              ...prev,
              {
                id: (Date.now() + 1).toString(),
                sender: "ai",
                text: cleanedText.trim(),
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
      }, 350);

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
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 text-white font-mono text-xs font-bold shadow-2xl hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-300 border border-blue-400/30"
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
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
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
                        : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
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
                            onClick={() => handleActionClick(act.action, act.url)}
                            className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[10px] font-mono font-semibold text-white border border-white/10 flex items-center gap-1 transition-all"
                          >
                            {act.action === "resume" && <FileText className="w-3 h-3 text-accent-blue" />}
                            {act.action === "email" && <Mail className="w-3 h-3 text-cyber-teal" />}
                            {act.action === "call" && <Phone className="w-3 h-3 text-accent-blue" />}
                            {act.action === "url" && <ExternalLink className="w-3 h-3 text-cyan-400" />}
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
                  <Bot className="w-4 h-4 text-accent-blue animate-pulse" />
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
                placeholder="Ask about SmartOffice, ForensiX Pro, Huzurr, .NET 8..."
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
