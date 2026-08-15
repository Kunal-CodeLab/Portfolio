import { Project, SkillCategory, EducationMilestone } from "./types";

export const DEV_PROFILE = {
  name: "Kunal Choudhary",
  title: "IT Specialist & Software Engineer",
  subtitle: "Specializing in Software Development, Automation, and DevOps platforms with a keen focus on digital forensics.",
  location: "AVAILABLE IMMEDIATELY // Seeking .NET, Full-Stack & DevOps Engineer Roles",
  email: "kunal.codes5@gmail.com",
  phone: "+91 6377470431",
  github: "https://github.com/Kunal-CodeLab",
  linkedin: "https://linkedin.com/in/kunal-choudhary-it",
  twitter: "https://twitter.com",
  resumeUrl: "https://drive.google.com/file/d/1io4SZFXUB5Hwyhnu9vQ2s4leV4EZs-gE/view?usp=sharing",
  avatar: "/images/developer_avatar.png",
  bio: "A passionate IT professional specializing in Software Development, Automation, and DevOps. Building secure, high-performance desktop and web applications while exploring digital forensics.",
  stats: [
    { label: "BCA Semester", value: "6th Sem" },
    { label: "Direct Email Ready", value: "kunal.codes5" }
  ]
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Core Languages & Web",
    skills: [
      { name: "Python (Django, Flask)", level: 90 },
      { name: "C# (.NET 8 WPF & Forms)", level: 92 },
      { name: "JavaScript / TypeScript", level: 88 },
      { name: "HTML5 & CSS3", level: 95 },
      { name: "PHP & SQL", level: 85 }
    ],
  },
  {
    title: "Backend & Architectures",
    skills: [
      { name: "OOPs (Concepts & Logic)", level: 90 },
      { name: "REST APIs & JSON Services", level: 88 },
      { name: "WASAPI / Win32 Hooks", level: 90 },
      { name: "JWT & Session Auth", level: 85 }
    ],
  },
  {
    title: "Databases & Storage",
    skills: [
      { name: "MySQL Database", level: 85 },
      { name: "SQLite & File Logging", level: 88 }
    ],
  },
  {
    title: "DevOps & Cloud Tools",
    skills: [
      { name: "AWS (EC2, VPC, S3)", level: 85 },
      { name: "Terraform & Ansible", level: 85 },
      { name: "Git & GitHub Automation", level: 92 },
      { name: "Docker Platforms", level: 80 },
      { name: "Nginx & Prometheus", level: 82 },
      { name: "Linux / Bash Shell", level: 85 }
    ],
  },
  {
    title: "Specialized Engineering",
    skills: [
      { name: "Digital Forensics Utilities", level: 88 },
      { name: "PyQt5 GUI Engineering", level: 90 },
      { name: "NAudio Audio Engine", level: 92 }
    ],
  }
];

export const EDUCATION_TIMELINE: EducationMilestone[] = [
  {
    id: "edu-1",
    period: "2023 - 2026",
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Jaipur National University",
    location: "Jaipur, Rajasthan",
    description: "Focusing on core computing foundational subjects, object-oriented concepts, database management systems, data structures, and secure web architectures.",
    grade: "Currently Active / 6th Semester"
  },
  {
    id: "edu-2",
    period: "2023",
    degree: "Senior Secondary School (XII) | Science Stream",
    institution: "Maharana Pratap School Jaipur (RBSE)",
    location: "Jaipur, Rajasthan",
    description: "Core coursework focused heavily on Science Stream, Mathematics, Physics, and Computer Applications."
  },
  {
    id: "edu-3",
    period: "2021",
    degree: "Secondary School (X)",
    institution: "The Learners Academy (RBSE)",
    location: "Jaipur, Rajasthan",
    description: "General high school coursework centered around Science, Advanced Mathematics, and Social Science foundations."
  }
];

export const PROJECTS: Project[] = [
  {
    id: "sonicboard",
    title: "SonicBoard Streaming Soundboard",
    description: "A low-latency desktop soundboard application built specifically for Windows operating systems enabling gamers and streamers to organize custom sound effects and assign instantaneous global hotkey shortcuts.",
    longDescription: "SonicBoard is built for live streamers and content creators who need instant, low-latency audio cue playback. Built natively on C# .NET with direct Windows WASAPI Audio Engine bindings & Win32 Low-Level Keyboard Hooks, it lets users trigger custom sound clips globally across any active game like Valorant or CS2.",
    features: [
      "Ultra-low latency audio engine using direct WASAPI / NAudio bindings",
      "Global hotkey registration even when minimized to system tray",
      "Win32 Low-Level Keyboard Hooks with keypress suppression",
      "Multi-device audio routing (headphones + virtual audio cable) & mic auto-mute",
      "Minimal RAM footprint (< 45MB during active playback)"
    ],
    architecture: "C# .NET 8.0, WPF, NAudio Engine, Win32 RegisterHotKey & SetWindowsHookEx APIs",
    tags: ["C# .NET 8", "WPF", "WASAPI Audio", "Win32 Hooks", "NAudio Engine"],
    imageSrc: "/images/sonicboard.PNG",
    liveUrl: "https://github.com/Kunal-CodeLab",
    githubUrl: "https://github.com/Kunal-CodeLab",
    category: "Desktop Application",
    highlighted: true
  },
  {
    id: "gitauto-push",
    title: "GitAuto-Push Workspace Automation",
    description: "A developer workspace automation utility built on Node.js streamlining local Git operations, automatic branch tracking, and background repo syncing.",
    longDescription: "Built to eliminate repetitive manual git commit and push commands. Sits silently in the developer workspace, automatically tracking file changes, generating timestamped commits, and syncing local commits with remote GitHub repositories, cutting manual git effort by 40%.",
    features: [
      "Automates local branch tracking and remote repo syncing",
      "Cuts manual developer git effort by 40%",
      "Glassmorphic developer dashboard UI built on Node.js",
      "Automated timestamped commit log generation"
    ],
    architecture: "Node.js, Git API, JavaScript, Glassmorphic CSS Dashboard",
    tags: ["Node.js", "Git API", "JavaScript", "Automation"],
    imageSrc: "/images/autogitpush.png",
    liveUrl: "https://github.com/Kunal-CodeLab",
    githubUrl: "https://github.com/Kunal-CodeLab",
    category: "Desktop Application",
    highlighted: true
  },
  {
    id: "automated-devops",
    title: "Automated DevOps Infrastructure (IaC)",
    description: "Architected end-to-end Infrastructure as Code (IaC) scripts using Terraform & Ansible to provision secure multi-AZ AWS cloud environments.",
    longDescription: "An Infrastructure as Code (IaC) project automating multi-tier web application deployments on AWS. Uses Terraform to provision isolated VPC subnets, EC2 instances, and security groups, paired with Ansible playbooks for Nginx deployment, Let's Encrypt SSL, and CloudWatch metrics monitoring achieving 99.9% uptime.",
    features: [
      "Zero-downtime automated provisioning using Terraform scripts",
      "Ansible playbooks for automated Nginx web server hardening",
      "Isolated AWS VPC setup with public/private subnet routing tables",
      "Automated Nginx deployment achieving 99.9% uptime & 50% faster incident response",
      "Integrated AWS CloudWatch dashboards, Prometheus & Grafana"
    ],
    architecture: "Terraform, Ansible, AWS EC2/VPC, CloudWatch, Nginx, Prometheus, Grafana",
    tags: ["Terraform", "Ansible", "AWS EC2/VPC", "Nginx", "CloudWatch"],
    imageSrc: "/images/devopsinfrastructure.png",
    liveUrl: "https://github.com/Kunal-CodeLab/devops-infrastructure-project",
    githubUrl: "https://github.com/Kunal-CodeLab/devops-infrastructure-project",
    category: "DevOps",
    highlighted: true
  },
  {
    id: "smart-file",
    title: "Smart File Management System",
    description: "A feature-rich C# .NET desktop application automating local file organization, file previews, directory watchers, handling 10,000+ files with 30% storage optimization.",
    longDescription: "An intelligent utility designed to eliminate messy desktop and downloads folders. It continuously monitors specified directories using background file system watchers and sorts incoming files by extension into organized subdirectories with optional rule-based renaming.",
    features: [
      "Handled 10,000+ local files with 30% storage layout optimization",
      "Automatic background directory watcher with zero CPU overhead",
      "Instant file thumbnail & metadata preview window",
      "Detailed operation history log with transaction safety",
      "Customizable file categorization rules (Documents, Images, Media, Archives)"
    ],
    architecture: "C# .NET, Windows Forms, Win32 File API, Transaction Safety",
    tags: ["C# .NET", "Windows Forms", "Win32 File API", "Automation"],
    imageSrc: "/images/fileorganiser.PNG",
    liveUrl: "https://github.com/Kunal-CodeLab",
    githubUrl: "https://github.com/Kunal-CodeLab",
    category: "Desktop Application",
    highlighted: false
  },
  {
    id: "forensic-analysis",
    title: "Windows Forensic Analysis Tool",
    description: "A digital forensics utility engineered with PyQt5 GUI for evidence extraction, deleted file recovery, processing raw disk artifacts 3x faster.",
    longDescription: "Developed as a digital forensics investigation utility, this tool enables security researchers and forensic analysts to perform deep disk examination on Windows systems, extract deleted file artifacts, parse browser cache/history databases, and compile tamper-evident evidence reports.",
    features: [
      "Engineered evidence extraction parsing raw disk artifacts 3x faster",
      "Deep unallocated disk space file carver for deleted file recovery",
      "Chrome, Edge, & Firefox history and cookie artifact parser",
      "SHA-256 / MD5 cryptographic file hashing for evidence integrity verification",
      "Timeline creation and SQLite artifact parser"
    ],
    architecture: "Python, PyQt5, SQLite, Evidence Recovery, Timeline Creation",
    tags: ["Python", "PyQt5", "Forensics", "Evidence Recovery", "SQLite"],
    imageSrc: "/images/forensic analysis tool.PNG",
    liveUrl: "https://github.com/Kunal-CodeLab/forensic_analysis_tool_complete",
    githubUrl: "https://github.com/Kunal-CodeLab/forensic_analysis_tool_complete",
    category: "Desktop Application",
    highlighted: false
  },
  {
    id: "ablespace-admin",
    title: "AbleSpace Admin Dashboard",
    description: "Built a pixel-perfect Figma-to-Code admin panel dashboard for a company hiring assessment under strict DevTools inspect & asset export restrictions.",
    longDescription: "Engineered for a strict technical hiring assessment where the Figma design had all inspector options and asset export tools disabled. Hand-crafted the responsive admin UI from scratch to achieve 100% pixel-perfect fidelity.",
    features: [
      "Pixel-perfect Figma to Code translation without asset export privileges",
      "Responsive admin dashboard analytics layout",
      "Clean modular component structure",
      "Deploys live on Vercel with fast page load performance"
    ],
    architecture: "React, TypeScript, Tailwind CSS, Vercel Production",
    tags: ["React", "TypeScript", "Figma to Code", "Vercel Live"],
    imageSrc: "/images/fileorganiser.PNG",
    liveUrl: "https://able-space-frontend-f5zn-ten.vercel.app/",
    githubUrl: "https://github.com/Kunal-CodeLab",
    category: "Take-Home Tasks",
    highlighted: false
  },
  {
    id: "pixel-perfect-landing",
    title: "Pixel-Perfect Landing Page",
    description: "Figma-to-Code responsive web page built under strict inspect & export restrictions for a company hiring assessment. Delivered 100% pixel-perfect design accuracy.",
    longDescription: "A high-precision landing page conversion task assigned by a hiring team to evaluate design fidelity and CSS mastery. Completed under a tight 24-hour turnaround window with zero design discrepancies.",
    features: [
      "100% Pixel-perfect layout replication from restricted Figma file",
      "Fully responsive across mobile, tablet, and ultra-wide displays",
      "Zero external bloated UI libraries, pure clean code",
      "Live Vercel deployment"
    ],
    architecture: "HTML5, CSS3, JavaScript, Vercel Cloud",
    tags: ["HTML5/CSS3", "JavaScript", "Figma to Code", "Vercel Live"],
    imageSrc: "/images/vulscanner.PNG",
    liveUrl: "https://assignment-oc3e45pwy-coderkunal02s-projects.vercel.app/",
    githubUrl: "https://github.com/Kunal-CodeLab",
    category: "Take-Home Tasks",
    highlighted: false
  },
  {
    id: "leaddesk-mini",
    title: "LeadDesk Mini CRM Portal",
    description: "A mini lead management & CRM dashboard assessment built and deployed live on Vercel with responsive tables, lead status filters, and search.",
    longDescription: "A mini CRM web application developed as a company technical assessment. Features lead status tracking, dynamic search filtering, and clean responsive table components.",
    features: [
      "Dynamic lead search and status filter options",
      "Responsive data table layout with action buttons",
      "Clean component architecture",
      "Live Vercel deployment"
    ],
    architecture: "React, Tailwind CSS, Vercel Hosting",
    tags: ["React", "Tailwind CSS", "CRM UI", "Vercel Live"],
    imageSrc: "/images/fileorganiser.PNG",
    liveUrl: "https://lead-desk-mini-3j8hc8p23-coderkunal02s-projects.vercel.app/",
    githubUrl: "https://github.com/Kunal-CodeLab",
    category: "Take-Home Tasks",
    highlighted: false
  },
  {
    id: "judiciary-portal",
    title: "Judiciary Legal Tech Portal",
    description: "Full-stack legal case portal UI take-home assessment deployed on Vercel featuring case tracking, lawyer directories, and responsive layouts.",
    longDescription: "A legal tech frontend portal assignment designed to showcase multi-page workflow architecture, lawyer listings, and case status management.",
    features: [
      "Legal case tracking UI components",
      "Lawyer directory listing cards",
      "Clean responsive navigation structure",
      "Live Vercel production build"
    ],
    architecture: "React, CSS Modules, Vercel Deployment",
    tags: ["React", "Legal Tech UI", "Full-Stack Layout", "Vercel Live"],
    imageSrc: "/images/vulscanner.PNG",
    liveUrl: "https://judiciary-gold-7xc89azyj-coderkunal02s-projects.vercel.app/",
    githubUrl: "https://github.com/Kunal-CodeLab",
    category: "Take-Home Tasks",
    highlighted: false
  }
];

export const CERTIFICATIONS = [
  {
    name: "Responsive Web Design Certification (300 Hours)",
    issuer: "freeCodeCamp",
    date: "Oct 2024",
    credentialUrl: "https://drive.google.com/file/d/15REYqBHw9l9ExcHEtYqTqOgDpNfRoSqk/view?usp=sharing"
  },
  {
    name: "Free DevOps Course Certification (CI/CD & Cloud)",
    issuer: "IntelliPaat Academy",
    date: "Aug 2025",
    credentialUrl: "https://drive.google.com/file/d/1IHppp7rp_hAD9-8P6q68e8pSY0q-3I5r/view?usp=sharing"
  },
  {
    name: "CSS (Basic) Skill Certification",
    issuer: "HackerRank",
    date: "Oct 2024",
    credentialUrl: "https://drive.google.com/file/d/1kTS3rQZWO-5fC-Ry1OhEJWLbM1whYbrS/view?usp=sharing"
  },
  {
    name: "Capture The Flag (CTF) Cybersecurity Hackathon Badge",
    issuer: "CyberCure Technologies",
    date: "Sep 2025",
    credentialUrl: "https://drive.google.com/file/d/1BC9t9V_E7jZ8d1WC48ThRYTF1SpiHfBO/view?usp=sharing"
  },
  {
    name: "Python Development Internship Training",
    issuer: "Codveda Technologies",
    date: "Sep 2025",
    credentialUrl: "https://drive.google.com/file/d/1QHES0t3V78B2OtTlAAHVwi8ehueOKPYj/view?usp=sharing"
  }
];
