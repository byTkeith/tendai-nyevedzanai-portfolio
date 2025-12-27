
import React, { useState, useEffect, useRef } from 'react';
import { portfolioData } from './data';
import { Section } from './components/Section';
import { askResumeAssistant } from './services/geminiService';

const App: React.FC = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: "Hello! I'm Tendai's AI assistant. Ask me anything about my SAP expertise, project ROI, or my work at Art of Scale." }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userQuery = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', text: userQuery }]);
    setChatInput('');
    setIsTyping(true);

    const aiResponse = await askResumeAssistant(userQuery);
    setIsTyping(false);
    setChatMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
  };

  const parseDraftEmail = (text: string) => {
    const match = text.match(/\[DRAFT_EMAIL: Subject: (.*?) \| Body: (.*?)\]/);
    if (match) {
      const subject = match[1];
      const body = match[2];
      const cleanText = text.replace(/\[DRAFT_EMAIL:.*?\]/, "");
      return { cleanText, subject, body };
    }
    return null;
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold tracking-tighter hover:opacity-80 transition-opacity">
            TENDAI<span className="text-blue-500">.</span>NY
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#experience" className="hover:text-white transition-colors">Experience</a>
            <a href="#contact" className="px-4 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition-colors">Get in touch</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="about" className="pt-40 pb-20 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-mono tracking-widest uppercase">
            Current Focus: Art of Scale (2025)
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
            I build systems that <span className="gradient-text">scale</span> and <span className="gradient-text">optimize</span>.
          </h1>
          <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
            {portfolioData.summary}
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <a href="#projects" className="px-8 py-3 bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/20">
              View My Work
            </a>
            <a href={portfolioData.socials.linkedin} target="_blank" className="px-8 py-3 bg-white/5 border border-white/10 rounded-lg font-semibold hover:bg-white/10 transition-all">
              LinkedIn
            </a>
          </div>
        </div>
        <div className="relative group flex justify-center">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative w-full aspect-square max-w-md bg-zinc-900 rounded-2xl overflow-hidden glass-effect flex items-center justify-center p-8">
             <div className="grid grid-cols-4 gap-4 w-full h-full opacity-20">
                {Array.from({length: 16}).map((_, i) => (
                  <div key={i} className="bg-blue-500 rounded-full w-full h-full animate-pulse" style={{ animationDelay: `${i * 100}ms` }}></div>
                ))}
             </div>
             <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src={portfolioData.socials.profileImage || `https://picsum.photos/seed/${portfolioData.name}/800/800`} 
                  alt={portfolioData.name} 
                  className="w-3/4 h-3/4 object-cover rounded-xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${portfolioData.name}/800/800`;
                  }}
                />
             </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <Section id="skills" title="Expertise">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Languages", items: portfolioData.skills.programming, color: "text-blue-400" },
            { title: "Frameworks & Tools", items: portfolioData.skills.tools, color: "text-purple-400" },
            { title: "ERP Systems", items: portfolioData.skills.erp, color: "text-emerald-400" },
            { title: "Business Strategy", items: portfolioData.skills.business, color: "text-orange-400" }
          ].map((cat, idx) => (
            <div key={idx} className="p-6 rounded-2xl glass-effect hover:translate-y-[-4px] transition-transform">
              <h3 className={`font-mono text-sm mb-4 uppercase tracking-wider ${cat.color}`}>{cat.title}</h3>
              <ul className="space-y-2">
                {cat.items.map((skill, i) => (
                  <li key={i} className="text-gray-300 font-medium">{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Projects Section */}
      <Section id="projects" title="Featured Work">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portfolioData.projects.map((project) => (
            <div key={project.id} className="group glass-effect rounded-2xl overflow-hidden border border-white/5 hover:border-blue-500/30 transition-all flex flex-col">
              <div className="aspect-video bg-zinc-900 relative overflow-hidden">
                <img 
                  src={project.image || `https://picsum.photos/seed/${project.id}/1200/800`} 
                  alt={project.title} 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all scale-100 group-hover:scale-110 duration-700"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${project.id}/1200/800`;
                  }}
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-black/50 backdrop-blur-md rounded text-[10px] font-mono border border-white/10 uppercase tracking-tighter">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-8 space-y-4 flex-grow flex flex-col">
                <h3 className="text-2xl font-bold group-hover:text-blue-400 transition-colors">{project.title}</h3>
                <p className="text-gray-400 leading-relaxed flex-grow">{project.description}</p>
                <div className="flex flex-wrap gap-3 pt-2">
                  {project.metrics?.map((m, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-mono text-blue-400 bg-blue-500/5 px-3 py-1.5 rounded-full border border-blue-500/10">
                      <div className="w-1 h-1 rounded-full bg-blue-500"></div>
                      {m}
                    </div>
                  ))}
                </div>
                {project.link && (
                  <div className="pt-6">
                    <a 
                      href={project.link} 
                      target="_blank" 
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/20"
                    >
                      Visit Live Site
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Experience Timeline */}
      <Section id="experience" title="Experience">
        <div className="space-y-12 relative before:absolute before:left-[17px] before:top-4 before:bottom-4 before:w-[2px] before:bg-gray-800">
          {portfolioData.experience.map((exp) => (
            <div key={exp.id} className="relative pl-12">
              <div className={`absolute left-0 top-1 w-9 h-9 rounded-full flex items-center justify-center z-10 ${exp.isCurrent ? 'bg-blue-500 ring-4 ring-blue-500/20 shadow-lg shadow-blue-500/40' : 'bg-zinc-800'}`}>
                {exp.isCurrent ? (
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                   <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                )}
              </div>
              <div className="glass-effect p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{exp.role}</h3>
                    <p className="text-blue-400 font-medium">{exp.company}</p>
                  </div>
                  <div className="flex flex-col md:items-end gap-2 text-right">
                    <span className="text-sm font-mono text-gray-500 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                      {exp.duration} • {exp.location}
                    </span>
                    {exp.link && (
                      <a href={exp.link} target="_blank" className="text-xs font-bold text-blue-400 flex items-center gap-1 hover:underline justify-end">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        {exp.linkText || "View Project"}
                      </a>
                    )}
                  </div>
                </div>
                <ul className="space-y-3">
                  {exp.description.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-400">
                      <span className="mt-1.5 text-blue-500 font-bold">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Certs & Honors Grid */}
      <Section id="credentials" title="Credentials">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
           {portfolioData.certifications.map(cert => (
              <div key={cert.id} className="p-6 glass-effect rounded-xl border border-white/5 flex flex-col justify-between hover:bg-white/5 transition-all">
                <h4 className="font-bold text-gray-200 mb-2 leading-tight">{cert.name}</h4>
                <p className="text-xs text-gray-500">{cert.issuer} • {cert.date}</p>
              </div>
           ))}
           {portfolioData.honors.map(honor => (
              <div key={honor.id} className="p-6 bg-blue-500/5 rounded-xl border border-blue-500/10 flex flex-col justify-between hover:bg-blue-500/10 transition-all">
                <h4 className="font-bold text-blue-400 mb-2 leading-tight">{honor.title}</h4>
                <p className="text-xs text-gray-400">{honor.description}</p>
                <div className="mt-2 text-[10px] font-mono uppercase tracking-widest text-blue-500/60 font-bold">
                  {honor.date}
                </div>
              </div>
           ))}
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact" title="Connect" className="pb-40">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold">Ready to optimize your next project?</h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              I'm always open to discussing software architecture, process improvement, or interesting AI challenges.
            </p>
            <div className="space-y-4 pt-4">
              <a href={`mailto:${portfolioData.socials.email}`} className="flex items-center gap-4 text-xl font-medium hover:text-blue-400 transition-colors group">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-500/20 transition-all">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                {portfolioData.socials.email}
              </a>
              <a href={portfolioData.socials.linkedin} target="_blank" className="flex items-center gap-4 text-xl font-medium hover:text-blue-400 transition-colors group">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-500/20 transition-all">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </div>
                LinkedIn Profile
              </a>
            </div>
          </div>
          <div className="bg-zinc-900/50 p-8 rounded-3xl glass-effect border border-white/5">
            <form className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-gray-500 uppercase mb-2">Full Name</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-xs font-mono text-gray-500 uppercase mb-2">Email Address</label>
                <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-xs font-mono text-gray-500 uppercase mb-2">Message</label>
                <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all" placeholder="Let's build something..."></textarea>
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-xl font-bold transition-all shadow-xl shadow-blue-900/20">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </Section>

      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm font-mono text-gray-500 text-center md:text-left">
            © {new Date().getFullYear()} Tendai K. Nyevedzanai. Engineered for Performance.
          </div>
          <div className="flex gap-8 text-sm font-medium text-gray-500">
             <a href="#about" className="hover:text-white transition-colors">About</a>
             <a href="#projects" className="hover:text-white transition-colors">Projects</a>
             <a href={portfolioData.socials.github} target="_blank" className="hover:text-white transition-colors">Github</a>
          </div>
        </div>
      </footer>

      {/* AI Assistant Button & Window */}
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4">
        {chatOpen && (
          <div className="w-[320px] md:w-[400px] h-[500px] bg-[#141414] rounded-3xl glass-effect border border-white/10 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-blue-600/10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="font-bold text-sm">Resume Assistant</span>
              </div>
              <button onClick={() => setChatOpen(false)} className="p-1 hover:bg-white/10 rounded-full transition-all">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex-grow overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {chatMessages.map((msg, i) => {
                const draft = msg.role === 'ai' ? parseDraftEmail(msg.text) : null;
                return (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className="max-w-[85%] space-y-2">
                      <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.role === 'user' 
                          ? 'bg-blue-600 text-white rounded-br-none' 
                          : 'bg-white/10 text-gray-200 rounded-bl-none'
                      }`}>
                        {draft ? draft.cleanText : msg.text}
                      </div>
                      {draft && (
                        <a 
                          href={`mailto:${portfolioData.socials.email}?subject=${encodeURIComponent(draft.subject)}&body=${encodeURIComponent(draft.body)}`}
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-[10px] font-bold hover:bg-blue-500/30 transition-all border border-blue-500/20"
                        >
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                          Send Draft to Tendai
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/10 px-4 py-2.5 rounded-2xl rounded-bl-none">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:200ms]"></div>
                      <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:400ms]"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10 bg-black/40">
              <div className="relative">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask about my SAP exp..."
                  className="w-full bg-white/5 border border-white/10 rounded-full px-5 py-2.5 pr-12 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
                />
                <button type="submit" className="absolute right-2 top-1.5 p-1 text-blue-500 hover:text-blue-400">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        )}
        
        <button 
          onClick={() => setChatOpen(!chatOpen)}
          className="group relative flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 ring-4 ring-blue-500/20"
        >
          {chatOpen ? (
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          ) : (
            <>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-[#0a0a0a] z-10"></div>
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default App;
