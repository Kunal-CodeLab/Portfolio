import { useState, FormEvent } from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Copy, Check } from "lucide-react";
import { DEV_PROFILE } from "../data";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [statusMsg, setStatusMsg] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      setStatusMsg("Please fill out all required fields (Name, Email, Message).");
      return;
    }

    if (!form.email.includes("@")) {
      setStatus("error");
      setStatusMsg("Please enter a valid email address.");
      return;
    }

    setStatus("sending");
    setStatusMsg("Sending your message directly...");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "cb8e034e-21fa-4ac3-bd38-3eb8f23b7fb8",
          name: form.name,
          email: form.email,
          subject: form.subject || `Portfolio Inquiry from ${form.name}`,
          message: form.message,
          from_name: `${form.name} (Portfolio)`
        })
      });

      if (res.ok) {
        setStatus("success");
        setStatusMsg("Message sent successfully! Kunal will get back to you shortly.");
        setForm({ name: "", email: "", subject: "", message: "" });
        return;
      }

      window.location.href = `mailto:${DEV_PROFILE.email}?subject=${encodeURIComponent(
        form.subject || "Portfolio Inquiry"
      )}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`)}`;
      setStatus("success");
      setStatusMsg("Opening your default mail application...");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Submission Error:", err);
      window.location.href = `mailto:${DEV_PROFILE.email}?subject=${encodeURIComponent(
        form.subject || "Portfolio Inquiry"
      )}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`)}`;
      setStatus("success");
      setStatusMsg("Opening your default mail client...");
    }
  };

  const copyToClipboard = (text: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 dot-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-6">
          <div>
            <span className="text-xs font-mono font-semibold tracking-[0.2em] text-cyber-teal uppercase block mb-3">
              GET IN TOUCH
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Contact Coordinates<span className="text-accent-blue">.</span>
            </h2>
          </div>
          <p className="max-w-md text-zinc-400 text-sm font-sans leading-relaxed">
            Let's connect — I'm actively looking for backend, frontend & full stack developer opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          {/* Contact Details & Direct Actions (5 columns) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="glass-panel rounded-3xl p-5 sm:p-8 space-y-6">
              <h3 className="font-display text-xl font-bold text-white mb-2">
                Reach Out Directly
              </h3>
              <p className="text-xs font-mono text-zinc-400 leading-relaxed">
                Whether you're a recruiter, hiring manager, or engineering lead, feel free to drop a message or reach out via direct channels.
              </p>

              <div className="space-y-4 pt-4 border-t border-white/5">
                {/* Email Card */}
                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center text-accent-blue">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">Email Address</span>
                      <a href={`mailto:${DEV_PROFILE.email}`} className="text-xs font-mono text-white font-medium hover:text-accent-blue transition-colors">
                        {DEV_PROFILE.email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(DEV_PROFILE.email, "email")}
                    className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-cyber-teal" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Phone Card */}
                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center text-accent-blue">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">Phone / WhatsApp</span>
                      <a href={`tel:${DEV_PROFILE.phone}`} className="text-xs font-mono text-white font-medium hover:text-accent-blue transition-colors">
                        {DEV_PROFILE.phone}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(DEV_PROFILE.phone, "phone")}
                    className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                    title="Copy Phone"
                  >
                    {copiedPhone ? <Check className="w-4 h-4 text-cyber-teal" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Location Card */}
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-cyber-teal/10 border border-cyber-teal/20 flex items-center justify-center text-cyber-teal">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">Location</span>
                    <span className="text-xs font-mono text-white font-medium">
                      Jaipur, Rajasthan, India (Open to Remote / Relocate)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form (7 columns) */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-3xl p-5 sm:p-10 relative overflow-hidden">
              <h3 className="font-display text-2xl font-bold text-white mb-2">
                Establish a Connection
              </h3>
              <p className="text-xs font-mono text-zinc-400 mb-8">
                Send a direct message right from this form to my inbox.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-sans text-white placeholder-zinc-500 focus:outline-none focus:border-accent-blue transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@organization.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-sans text-white placeholder-zinc-500 focus:outline-none focus:border-accent-blue transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-2">
                    Subject Line
                  </label>
                  <input
                    type="text"
                    placeholder="Architectural Audit / Full-time Opportunity"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-sans text-white placeholder-zinc-500 focus:outline-none focus:border-accent-blue transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-2">
                    Message Payload *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Briefly state your technical requirements or developer opportunity details..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-sans text-white placeholder-zinc-500 focus:outline-none focus:border-accent-blue transition-colors resize-none"
                  />
                </div>

                {statusMsg && (
                  <div
                    className={`p-4 rounded-xl text-xs font-mono flex items-center gap-2 ${
                      status === "success"
                        ? "bg-cyber-teal/10 border border-cyber-teal/30 text-cyber-teal"
                        : status === "error"
                        ? "bg-red-500/10 border border-red-500/30 text-red-400"
                        : "bg-accent-blue/10 border border-accent-blue/30 text-accent-blue"
                    }`}
                  >
                    {status === "success" ? (
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 shrink-0" />
                    )}
                    <span>{statusMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-4 bg-white text-obsidian text-xs font-mono font-bold uppercase tracking-widest rounded-xl hover:bg-zinc-200 transition-colors shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <span>{status === "sending" ? "Dispatching..." : "Dispatch Message"}</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
