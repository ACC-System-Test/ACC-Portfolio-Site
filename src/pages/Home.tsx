import React from 'react';
import { Page } from '../types';
import { MissionVisionSection, ExpertiseGrid, NewsGrid } from '../components/Sections';
import { ArrowRight, ShieldCheck } from 'lucide-react';

interface HomeProps {
  setCurrentPage: (page: Page) => void;
}

export const Home: React.FC<HomeProps> = ({ setCurrentPage }) => {
  return (
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
        {/*<div className="mb-12">
          <p className="text-[#0084d1] text-sm font-bold uppercase tracking-widest mb-4">Get To Know Us</p>
          <h2 className="text-4xl font-bold text-gray-900 max-w-lg">We specialize in holistic cybersecurity services</h2>
        </div>  */}
        <MissionVisionSection />
      </section>

      {/* Expertise Section */}
      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="mb-12">
            <p className="text-[#0084d1] text-sm font-bold uppercase tracking-widest mb-4">Our Expertise</p>
            <h2 className="text-4xl font-bold text-gray-900 max-w-2xl">Comprehensive protection for the digital landscape</h2>
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
};
