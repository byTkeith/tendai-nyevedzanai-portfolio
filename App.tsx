
import React, { useState, useEffect, useRef } from 'react';
import { portfolioData } from './data';
import { Section } from './components/Section';
import { askResumeAssistant } from './services/geminiService';

const App: React.FC = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: "Hello! I'm Tendai's AI assistant. Ask me about his work at Art of Scale, his 20% revenue preservation project, or his SAP expertise." }
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

    try {
      const aiResponse = await askResumeAssistant(userQuery);
      setChatMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    } catch (err) {
      setChatMessages(prev => [...prev, { role: 'ai', text: "I apologize, I'm having trouble connecting right now. Please try again or message Tendai on LinkedIn." }]);
    } finally {
      setIsTyping(false);
    }
  };

  // Separate featured projects from extra projects
  const featuredProjects = portfolioData.projects.filter(p => p.image);
  const extraProjects = portfolioData.projects.filter(p => !p.image);

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
            <a href={`mailto:${portfolioData.socials.email}`} className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all font-bold">Hire Me</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="about" className="pt-48 pb-24 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono tracking-widest uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Engineering @ Art of Scale
          </div>
          <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter">
            Architecting <br/>
            <span className="gradient-text">Efficient</span> <br/>
            Solutions.
          </h1>
          <p className="text-xl text-gray-400 max-w-xl leading-relaxed font-medium">
            {portfolioData.summary}
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <a href="#projects" className="px-10 py-4 bg-white text-black rounded-xl font-bold hover:bg-gray-200 transition-all shadow-xl shadow-white/5">
              View Work
            </a>
            <a href={portfolioData.socials.linkedin} target="_blank" className="px-10 py-4 glass-effect border border-white/10 rounded-xl font-bold hover:bg-white/5 transition-all">
              LinkedIn
            </a>
          </div>
        </div>
        
        <div className="relative group flex justify-center lg:justify-end">
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-3xl opacity-20 group-hover:opacity-30 transition duration-1000"></div>
          <div className="relative w-full max-w-md aspect-[4/5] bg-zinc-900 rounded-3xl overflow-hidden glass-effect float-animation shadow-2xl">
             <img 
                src={portfolioData.socials.profileImage} 
                alt={portfolioData.name} 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/avataaars/svg?seed=Tendai&backgroundColor=050505`;
                }}
             />
             <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                <div className="text-2xl font-black tracking-tight">{portfolioData.name}</div>
                <div className="text-sm font-mono text-blue-400">{portfolioData.title}</div>
             </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <Section id="skills" title="Technical Arsenal">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: "Engineering", items: portfolioData.skills.programming, color: "text-blue-400", icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" },
            { title: "ERP & Systems", items: portfolioData.skills.erp, color: "text-purple-400", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
            { title: "Infrastructure", items: portfolioData.skills.tools, color: "text-emerald-400", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
            { title: "Strategy", items: portfolioData.skills.business, color: "text-orange-400", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" }
          ].map((cat, idx) => (
            <div key={idx} className="p-8 rounded-3xl glass-effect border border-white/5 hover:border-white/10 transition-all flex flex-col items-start gap-6">
              <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center ${cat.color}`}>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={cat.icon} />
                </svg>
              </div>
              <div>
                <h3 className={`font-mono text-xs mb-4 uppercase tracking-widest font-bold ${cat.color}`}>{cat.title}</h3>
                <ul className="space-y-3">
                  {cat.items.map((skill, i) => (
                    <li key={i} className="text-gray-300 font-medium text-sm border-l border-white/10 pl-3">{skill}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Projects Section */}
      <Section id="projects" title="Featured Work">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProjects.map((project) => (
            <div key={project.id} className="group glass-effect rounded-3xl overflow-hidden border border-white/5 hover:border-blue-500/30 transition-all flex flex-col shadow-2xl">
              <div className="aspect-video bg-zinc-900 relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover opacity-40 group-hover:opacity-70 transition-all duration-700 scale-100 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000`;
                  }}
                />
                <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-black/60 backdrop-blur-xl rounded-full text-[10px] font-bold border border-white/10 uppercase tracking-wider text-white">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-10 space-y-6 flex-grow flex flex-col">
                <h3 className="text-3xl font-black group-hover:text-blue-400 transition-colors tracking-tight">{project.title}</h3>
                <p className="text-gray-400 leading-relaxed font-medium flex-grow">{project.description}</p>
                
                <div className="grid grid-cols-2 gap-3">
                  {project.metrics?.map((m, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-bold text-blue-400 bg-blue-500/5 px-4 py-2.5 rounded-xl border border-blue-500/10">
                      {m}
                    </div>
                  ))}
                </div>

                <div className="pt-6 flex gap-4">
                  {project.link && (
                    <a href={project.link} target="_blank" className="flex-1 text-center py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all">
                      Visit Project
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} target="_blank" className="p-3 glass-effect rounded-xl hover:bg-white/5 transition-all">
                       <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Additional Projects (No images) */}
      <Section id="additional-projects" title="Technical Contributions">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {extraProjects.map((project) => (
            <div key={project.id} className="p-8 glass-effect rounded-[32px] border border-white/5 hover:border-white/20 transition-all flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                   {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-mono text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded-md border border-blue-400/20">{tag}</span>
                   ))}
                </div>
                <h3 className="text-2xl font-black group-hover:text-blue-400 transition-colors">{project.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed font-medium">{project.description}</p>
              </div>
              <div className="mt-8 flex items-center justify-between">
                <div className="flex gap-4">
                  {project.metrics?.map((m, i) => (
                    <span key={i} className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{m}</span>
                  ))}
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Experience Timeline */}
      <Section id="experience" title="Professional Timeline">
        <div className="space-y-8">
          {portfolioData.experience.map((exp) => (
            <div key={exp.id} className="relative group">
              <div className="glass-effect p-10 rounded-3xl border border-white/5 group-hover:border-blue-500/20 transition-all flex flex-col md:flex-row gap-8">
                <div className="md:w-1/4">
                  <div className="text-sm font-mono text-blue-500 font-bold mb-2">{exp.duration}</div>
                  <div className="text-gray-500 text-xs font-medium uppercase tracking-widest">{exp.location}</div>
                  {exp.isCurrent && (
                    <div className="mt-4 inline-block px-3 py-1 bg-blue-500 text-white text-[10px] font-black uppercase rounded-full tracking-tighter">Current Role</div>
                  )}
                </div>
                <div className="flex-1 space-y-6">
                  <div>
                    <h3 className="text-3xl font-black tracking-tight mb-1">{exp.role}</h3>
                    <div className="text-blue-400 font-bold text-lg">{exp.company}</div>
                  </div>
                  <ul className="space-y-4">
                    {exp.description.map((point, i) => (
                      <li key={i} className="flex items-start gap-4 text-gray-400 font-medium leading-relaxed">
                        <div className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0"></div>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  {exp.link && (
                    <a href={exp.link} target="_blank" className="inline-flex items-center gap-2 text-sm font-black text-blue-500 hover:text-blue-400">
                      {exp.linkText || "View Details"}
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Credentials */}
      <Section id="credentials" title="Recognition">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
           {portfolioData.certifications.map(cert => (
              <div key={cert.id} className="p-8 glass-effect rounded-3xl border border-white/5 hover:bg-white/5 transition-all">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 text-blue-400">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                <h4 className="font-black text-white text-xl mb-2">{cert.name}</h4>
                <p className="text-sm text-gray-500 font-bold">{cert.issuer} • {cert.date}</p>
              </div>
           ))}
           {portfolioData.honors.map(honor => (
              <div key={honor.id} className="p-8 bg-blue-600/5 rounded-3xl border border-blue-600/10 hover:bg-blue-600/10 transition-all">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center mb-6 text-blue-400 font-black">ROI</div>
                <h4 className="font-black text-blue-400 text-xl mb-2">{honor.title}</h4>
                <p className="text-sm text-gray-400 font-medium">{honor.description}</p>
                <div className="mt-4 text-[10px] font-mono font-black text-blue-500/50">{honor.date}</div>
              </div>
           ))}
        </div>
      </Section>

      {/* AI Assistant FAB */}
      <div className="fixed bottom-10 right-10 z-[100] flex flex-col items-end gap-6">
        {chatOpen && (
          <div className="w-[380px] h-[550px] bg-[#0c0c0c] rounded-[32px] glass-effect border border-white/10 shadow-[0_32px_64px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden animate-in slide-in-from-bottom-8 duration-500">
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-blue-600/10">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                <span className="font-black text-sm uppercase tracking-widest">Engineering Assistant</span>
              </div>
              <button onClick={() => setChatOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-all text-gray-500 hover:text-white">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <div className="flex-grow overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[88%] px-5 py-3.5 rounded-2xl text-sm font-medium leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/10' 
                      : 'bg-white/5 text-gray-300 border border-white/10'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 px-5 py-3.5 rounded-2xl">
                    <div className="flex gap-1.5">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:200ms]"></div>
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:400ms]"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-6 bg-black/40 border-t border-white/10">
              <div className="relative">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask about Tendai's projects..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 pr-14 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all placeholder:text-gray-600"
                />
                <button type="submit" className="absolute right-3 top-3 p-2 text-blue-500 hover:text-white transition-colors" disabled={isTyping}>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
                </button>
              </div>
            </form>
          </div>
        )}
        
        <button 
          onClick={() => setChatOpen(!chatOpen)}
          className="group w-20 h-20 bg-blue-600 rounded-[24px] shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300 ring-8 ring-blue-500/10 relative"
        >
          {chatOpen ? (
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          ) : (
            <>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 rounded-full border-4 border-[#050505] z-10 animate-pulse"></div>
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </>
          )}
        </button>
      </div>

      <footer className="py-20 px-6 border-t border-white/5 mt-40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="text-3xl font-black tracking-tighter">TENDAI<span className="text-blue-500">.</span>NY</div>
           <div className="text-sm font-mono text-gray-500 font-bold uppercase tracking-widest">
             Built for Impact. © {new Date().getFullYear()}
           </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
