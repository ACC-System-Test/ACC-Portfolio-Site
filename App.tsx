
import React, { useState, useEffect } from 'react';
import { Page } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ContactForm } from './components/Forms';
import { MissionVisionSection, ExpertiseGrid, NewsGrid } from './components/Sections';
import { OrganizationStructure } from './components/OrganizationStructure';
import { ArrowRight, Play, Facebook, Twitter, Instagram, Linkedin, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderHome = () => (
    <div className="space-y-24 pb-24 animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="hero-gradient h-screen min-h-[700px] flex items-center relative">
        <div className="container mx-auto px-6 max-w-7xl relative z-10 pt-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 leading-tight tracking-tight">
              Strengthening Africa's <span className="text-[#0084d1]">Cyber Resilience</span>
            </h1>
            <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-2xl">
              Africa's premier non-profit consortium dedicated to advancing cybersecurity through education, research, and collective defense. We bridge the gap between emerging threats and digital security.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => setCurrentPage(Page.SOLUTIONS)} 
                className="bg-[#0084d1] hover:bg-[#006bb0] text-white px-8 py-4 rounded-xl font-bold transition-all shadow-xl hover:-translate-y-1"
              >
                Explore Our Solutions
              </button>
              <button 
                onClick={() => setCurrentPage(Page.ABOUT)}
                className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-xl font-bold transition-all shadow-xl hover:-translate-y-1"
              >
                Learn More
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24">
            {[
              { label: "Active Members", val: "500+" },
              { label: "Projects Completed", val: "128" },
              { label: "Partner Nations", val: "15" },
              { label: "Lives Impacted", val: "25k" }
            ].map((stat, i) => (
              <div key={i} className="text-white border-l border-white/20 pl-6">
                <p className="text-4xl font-bold mb-1">{stat.val}</p>
                <p className="text-sm opacity-80 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Holistic Services Section */}
      <section className="container mx-auto px-6 max-w-7xl scroll-mt-32">
        <div className="mb-12">
          <p className="text-[#0084d1] text-sm font-bold uppercase tracking-widest mb-4">Get To Know Us</p>
          <h2 className="text-4xl font-bold text-gray-900 max-w-lg">We specialize in holistic cybersecurity services</h2>
        </div>
        <MissionVisionSection />
      </section>

      {/* Expertise Section */}
      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <p className="text-[#0084d1] text-sm font-bold uppercase tracking-widest mb-4">Our Expertise</p>
            <h2 className="text-4xl font-bold text-gray-900">Comprehensive protection for the digital landscape</h2>
          </div>
          <ExpertiseGrid />
        </div>
      </section>

      {/* Featured Impact */}
      <section className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
           <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000" 
                className="rounded-[3rem] shadow-2xl relative z-10" 
                alt="Cyber Operations" 
              />
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-100 rounded-full -z-0"></div>
           </div>
           <div>
              <p className="text-[#0084d1] text-sm font-bold uppercase tracking-widest mb-4">Impact Spotlight</p>
              <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">Securing the next generation of African tech leaders</h2>
              <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                Our initiative "Cyber Guard Africa" has trained over 10,000 students across the continent in ethical hacking, secure coding, and threat intelligence. We don't just provide tools; we cultivate expertise.
              </p>
              <ul className="space-y-4 mb-10">
                {["Regional Training Centers", "Stakeholder Collaboration", "Real-time Threat Feeds"].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 font-medium text-gray-800">
                    <div className="bg-[#0084d1] rounded-full p-1 text-white">
                      <ShieldCheck size={16} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <button onClick={() => setCurrentPage(Page.SOLUTIONS)} className="group flex items-center gap-3 text-[#0084d1] font-bold text-lg">
                View All Initiatives
                <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>
           </div>
        </div>
      </section>

      {/* Blog/News Preview */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="text-[#0084d1] text-sm font-bold uppercase tracking-widest mb-4">Latest Updates</p>
              <h2 className="text-4xl font-bold text-gray-900">Insights from our experts</h2>
            </div>
            <button onClick={() => setCurrentPage(Page.BLOG)} className="hidden md:flex items-center gap-2 text-gray-900 font-bold border-b-2 border-[#0084d1]">
              View All Posts
            </button>
          </div>
          <NewsGrid />
        </div>
      </section>

      {/* Simple CTA */}
      <section className="container mx-auto px-6 max-w-7xl">
        <div className="bg-[#0084d1] rounded-[3rem] p-12 md:p-20 text-white flex flex-col items-center text-center shadow-2xl">
           <h2 className="text-4xl md:text-5xl font-bold mb-8 max-w-3xl leading-tight">Ready to fortify your organization against modern threats?</h2>
           <p className="text-xl text-white/80 mb-12 max-w-2xl">Join the consortium and gain access to a network of elite cybersecurity professionals across the continent.</p>
           <button 
             onClick={() => setCurrentPage(Page.CONTACT)}
             className="bg-white text-[#0084d1] px-12 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-transform shadow-xl"
            >
             Get Started Today
           </button>
        </div>
      </section>
    </div>
  );

  const renderAbout = () => (
    <div className="space-y-24 pb-24 animate-in fade-in duration-700">
      <section className="hero-gradient h-[60vh] min-h-[500px] flex items-center relative">
        <div className="container mx-auto px-6 max-w-7xl pt-20">
          <span className="bg-blue-500/30 text-white text-xs font-bold uppercase tracking-[0.3em] px-4 py-2 rounded-full mb-6 inline-block">Established 2021</span>
          <h1 className="text-6xl font-extrabold text-white mb-6">Securing the Continent's Digital Sovereignty</h1>
          <p className="text-xl text-white/90 max-w-2xl leading-relaxed">
            The Africa Cybersecurity Consortium is a collective force of experts, policy makers, and technology leaders.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-6 max-w-7xl">
        <MissionVisionSection />
      </section>

      <section className="bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="mb-16 text-center">
            <p className="text-[#0084d1] text-sm font-bold uppercase tracking-widest mb-4">Our Leadership</p>
            <h2 className="text-4xl font-bold text-gray-900">Guided by visionaries</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Tuyishimire Jean Bonfils", role: "Chief Executive Officer", img: "https://i.pravatar.cc/300?img=68" },
              { name: "Dr. Elena Mbeki", role: "Head of Research", img: "https://i.pravatar.cc/300?img=44" },
              { name: "Marcus Okafor", role: "Strategic Partnerships", img: "https://i.pravatar.cc/300?img=11" },
              { name: "Amina Diallo", role: "Policy & Advocacy", img: "https://i.pravatar.cc/300?img=32" }
            ].map((leader, i) => (
              <div key={i} className="group relative overflow-hidden rounded-[2.5rem] bg-gray-50 aspect-[4/5] shadow-sm hover:shadow-2xl transition-all">
                <img src={leader.img} alt={leader.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 p-8 text-white">
                  <h4 className="text-2xl font-bold mb-1">{leader.name}</h4>
                  <p className="text-white/70 font-medium mb-4">{leader.role}</p>
                  <div className="flex gap-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <Linkedin size={20} className="hover:text-blue-400 cursor-pointer" />
                    <Twitter size={20} className="hover:text-blue-400 cursor-pointer" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 max-w-7xl">
        <div className="mb-12">
          <p className="text-[#0084d1] text-sm font-bold uppercase tracking-widest mb-4">Structure</p>
          <h2 className="text-4xl font-bold text-gray-900">Designed for agility and impact</h2>
        </div>
        <OrganizationStructure />
      </section>
    </div>
  );

  const renderSolutions = () => (
    <div className="space-y-24 pb-24 animate-in fade-in duration-700">
      <section className="hero-gradient h-[60vh] min-h-[500px] flex items-center relative">
        <div className="container mx-auto px-6 max-w-7xl pt-20">
          <h1 className="text-6xl font-extrabold text-white mb-6">Security Solutions Built for Africa</h1>
          <p className="text-xl text-white/90 max-w-2xl leading-relaxed">
            From critical infrastructure protection to individual training programs, we provide the tools to defend and thrive.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-6 max-w-7xl">
        <div className="mb-12">
          <p className="text-[#0084d1] text-sm font-bold uppercase tracking-widest mb-4">Our Ecosystem</p>
          <h2 className="text-4xl font-bold text-gray-900">Empowering every sector</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { title: "Public Sector Defense", desc: "Strengthening government data integrity and citizen services protection.", color: "bg-blue-50" },
            { title: "Enterprise Resilience", desc: "Advanced threat detection and incident response for the African business sector.", color: "bg-indigo-50" },
            { title: "Academic Outreach", desc: "Developing world-class cybersecurity curricula for universities and technical colleges.", color: "bg-sky-50" }
          ].map((item, i) => (
            <div key={i} className={`${item.color} p-12 rounded-[2.5rem] border border-black/5 hover:scale-[1.02] transition-transform`}>
              <ShieldCheck size={48} className="text-[#0084d1] mb-8" />
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-8">{item.desc}</p>
              <button className="font-bold text-[#0084d1] flex items-center gap-2 group">
                Learn More <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-900 py-24 text-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <div>
                <h2 className="text-4xl font-bold mb-8">Ready to secure your digital future?</h2>
                <p className="text-white/70 text-lg mb-12 leading-relaxed">
                  Join hundreds of organizations already benefiting from our collective intelligence network and specialized training sessions.
                </p>
                <div className="grid grid-cols-2 gap-8">
                   <div>
                      <p className="text-3xl font-bold text-[#0084d1] mb-1">24/7</p>
                      <p className="text-white/50 text-sm">Monitoring Capability</p>
                   </div>
                   <div>
                      <p className="text-3xl font-bold text-[#0084d1] mb-1">99.9%</p>
                      <p className="text-white/50 text-sm">Threat Neutralization</p>
                   </div>
                </div>
             </div>
             <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem]">
                <h3 className="text-2xl font-bold mb-6">Request a Consult</h3>
                <form className="space-y-4">
                   <input type="text" placeholder="Full Name" className="w-full bg-white/10 border-none rounded-xl p-4 text-white placeholder:text-white/40 focus:ring-2 focus:ring-[#0084d1]" />
                   <input type="email" placeholder="Work Email" className="w-full bg-white/10 border-none rounded-xl p-4 text-white placeholder:text-white/40 focus:ring-2 focus:ring-[#0084d1]" />
                   <textarea placeholder="Tell us about your needs" className="w-full bg-white/10 border-none rounded-xl p-4 text-white placeholder:text-white/40 focus:ring-2 focus:ring-[#0084d1] h-32"></textarea>
                   <button className="w-full bg-[#0084d1] py-4 rounded-xl font-bold text-white hover:bg-[#006bb0] transition-colors">Submit Request</button>
                </form>
             </div>
          </div>
        </div>
      </section>
    </div>
  );

  const renderBlog = () => (
    <div className="space-y-24 pb-24 animate-in fade-in duration-700">
      <section className="hero-gradient h-[60vh] min-h-[500px] flex items-center relative">
        <div className="container mx-auto px-6 max-w-7xl pt-20">
          <h1 className="text-6xl font-extrabold text-white mb-6">ACC Insights & Intelligence</h1>
          <p className="text-xl text-white/90 max-w-2xl leading-relaxed">
            Leading thoughts on cyber security trends, policy updates, and regional threat reports.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
           <div className="lg:col-span-8 space-y-16">
              {[1,2,3].map(i => (
                <article key={i} className="group">
                  <div className="overflow-hidden rounded-[2.5rem] mb-8 shadow-xl">
                    <img src={`https://picsum.photos/seed/${i+20}/1000/600`} alt="Blog Hero" className="w-full h-[450px] object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="flex items-center gap-4 text-sm font-semibold text-[#0084d1] mb-4 uppercase tracking-widest">
                    <span>Expert Analysis</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <span className="text-gray-500">Oct 24, 2023</span>
                  </div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-6 group-hover:text-[#0084d1] transition-colors leading-tight">
                    The Rise of Ransomware in Sub-Saharan Africa: How to Prepare
                  </h2>
                  <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                    As digital transformation accelerates across the continent, so do the sophisticated methods of cyber criminals. In this deep dive, our lead researcher explores the latest trends in regional cyber-extortion.
                  </p>
                  <button className="flex items-center gap-3 font-bold text-lg group-hover:gap-5 transition-all">
                    Read Full Story <ArrowRight className="text-[#0084d1]" />
                  </button>
                </article>
              ))}
           </div>
           
           <aside className="lg:col-span-4 space-y-12">
              <div className="bg-gray-50 p-10 rounded-[2.5rem]">
                 <h3 className="text-2xl font-bold mb-6">Popular Tags</h3>
                 <div className="flex flex-wrap gap-2">
                    {["Cyber Policy", "Threat Intel", "FinTech", "Data Privacy", "Ethical Hacking", "Cloud Security"].map(tag => (
                      <span key={tag} className="px-4 py-2 bg-white rounded-xl text-sm font-medium text-gray-600 hover:bg-[#0084d1] hover:text-white transition-colors cursor-pointer border border-gray-100 shadow-sm">{tag}</span>
                    ))}
                 </div>
              </div>

              <div className="bg-[#0084d1] p-10 rounded-[2.5rem] text-white">
                 <Mail size={32} className="mb-6" />
                 <h3 className="text-2xl font-bold mb-4">Newsletter</h3>
                 <p className="text-white/80 mb-8">Get the latest threat intelligence reports delivered to your inbox.</p>
                 <form className="space-y-4">
                    <input type="email" placeholder="Your Email" className="w-full bg-white/20 border-none rounded-xl p-4 text-white placeholder:text-white/60" />
                    <button className="w-full bg-white text-[#0084d1] py-4 rounded-xl font-bold">Subscribe</button>
                 </form>
              </div>
           </aside>
        </div>
      </section>
    </div>
  );

  const renderContact = () => (
    <div className="space-y-24 pb-24 animate-in fade-in duration-700">
      <section className="hero-gradient h-[50vh] min-h-[400px] flex items-center relative">
        <div className="container mx-auto px-6 max-w-7xl pt-20">
          <h1 className="text-6xl font-extrabold text-white mb-6">Let's Talk Security</h1>
          <p className="text-xl text-white/90 max-w-2xl leading-relaxed">
            Available for collaboration, policy consulting, and organizational training.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
           <div>
              <p className="text-[#0084d1] text-sm font-bold uppercase tracking-widest mb-4">Connect With Us</p>
              <h2 className="text-5xl font-bold text-gray-900 mb-10 leading-tight">We are here to help you grow securely.</h2>
              
              <div className="space-y-10">
                 <div className="flex gap-6 items-start">
                    <div className="bg-blue-50 p-4 rounded-2xl text-[#0084d1]">
                       <MapPin size={28} />
                    </div>
                    <div>
                       <h4 className="text-xl font-bold mb-2">Our Headquarters</h4>
                       <p className="text-gray-600">Cyber Hub, Plot 2231, Financial District<br />Kigali, Rwanda</p>
                    </div>
                 </div>

                 <div className="flex gap-6 items-start">
                    <div className="bg-blue-50 p-4 rounded-2xl text-[#0084d1]">
                       <Phone size={28} />
                    </div>
                    <div>
                       <h4 className="text-xl font-bold mb-2">Call Us</h4>
                       <p className="text-gray-600">+250 788 000 000<br />+250 789 111 222</p>
                    </div>
                 </div>

                 <div className="flex gap-6 items-start">
                    <div className="bg-blue-50 p-4 rounded-2xl text-[#0084d1]">
                       <Mail size={28} />
                    </div>
                    <div>
                       <h4 className="text-xl font-bold mb-2">Email Us</h4>
                       <p className="text-gray-600">contact@acc-africa.org<br />support@acc-africa.org</p>
                    </div>
                 </div>
              </div>

              <div className="mt-16 flex gap-6">
                 {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                    <a key={idx} href="#" className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-[#0084d1] hover:text-white hover:scale-110 transition-all shadow-sm">
                       <Icon size={24} />
                    </a>
                 ))}
              </div>
           </div>

           <div>
              <ContactForm title="Send us a direct message" />
           </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="container mx-auto px-6 max-w-7xl">
         <div className="h-[500px] w-full bg-gray-100 rounded-[3rem] overflow-hidden border border-gray-200 relative">
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50/50 backdrop-blur-sm">
               <div className="text-center p-8">
                  <MapPin size={48} className="mx-auto text-[#0084d1] mb-4" />
                  <p className="text-lg font-bold text-gray-900">Interactive Map Coming Soon</p>
                  <p className="text-gray-500">Visit us in the heart of Kigali's Tech Hub.</p>
               </div>
            </div>
         </div>
      </section>
    </div>
  );

  return (
    <div className="min-h-screen bg-white selection:bg-[#0084d1] selection:text-white">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <main className="pt-0">
        {currentPage === Page.HOME && renderHome()}
        {currentPage === Page.ABOUT && renderAbout()}
        {currentPage === Page.SOLUTIONS && renderSolutions()}
        {currentPage === Page.BLOG && renderBlog()}
        {currentPage === Page.CONTACT && renderContact()}
      </main>

      <Footer onNavigate={setCurrentPage} />
    </div>
  );
};

export default App;
