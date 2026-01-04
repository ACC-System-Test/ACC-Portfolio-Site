
import React from 'react';
import { ArrowRight, Eye, Target, Rocket, ShieldCheck, Search, Code, LifeBuoy, FileSearch, Zap } from 'lucide-react';

export const MissionVisionSection = () => {
  const cards = [
    {
      title: "Our Goal",
      icon: Target,
      desc: "Reduce cyber threats by building skills, partnerships, and advanced capabilities.",
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: "Our Vision",
      icon: Eye,
      desc: "A secure digital Africa with empowered cybersecurity talent everywhere.",
      color: "bg-indigo-50 text-indigo-600"
    },
    {
      title: "Our Mission",
      icon: Rocket,
      desc: "Strengthen cyber resilience through collaboration, training, innovation, and trusted solutions.",
      color: "bg-sky-50 text-sky-600"
    }
  ];

  return (
    <div className="py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <div className="space-y-8 animate-in slide-in-from-left-10 duration-700 fade-in">
          <div>
            <h2 className="text-sm font-bold text-[#0084d1] uppercase tracking-widest mb-2">About ACC</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Securing Africa's <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0084d1] to-blue-400">Digital Future</span>
            </h3>
          </div>

          <p className="text-lg text-gray-600 leading-relaxed">
            Africa Cybersecurity Consortium (ACC) is a non-profit organization advancing cybersecurity development in Africa through skills training, stakeholder collaboration, research, innovation, and access to trusted security solutions for all sectors.
          </p>

          <div className="flex items-center gap-4 pt-4">
            <div className="flex -space-x-4">
              {[1, 2, 3].map(i => (
                <img key={i} src={`https://picsum.photos/seed/${i}/100/100`} className="w-12 h-12 rounded-full border-4 border-white" alt="Member" />
              ))}
            </div>
            <div className="text-sm">
              <span className="block font-bold text-gray-900">Trusted by Experts</span>
              <span className="text-gray-500">Across 15+ Countries</span>
            </div>
          </div>
        </div>

        {/* Right Cards Grid */}
        <div className="grid gap-6 relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-100/50 to-purple-100/50 rounded-[3rem] blur-2xl -z-10" />

          {cards.map((card, i) => (
            <div
              key={i}
              className={`bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-start gap-6 animate-in slide-in-from-bottom-10 fade-in`}
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div className={`p-4 rounded-2xl ${card.color} shrink-0`}>
                <card.icon size={32} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{card.title}</h4>
                <p className="text-gray-600 leading-relaxed">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ExpertiseGrid = () => {
  const expertises = [
    { title: "Security Awareness", icon: ShieldCheck, desc: "We teach people how to stay safe online and avoid common cyber threats." },
    { title: "Cyber Research", icon: Search, desc: "We study new cyber risks and find better ways to protect systems and data." },
    { title: "Security Solutions", icon: Code, desc: "We build tools and software that help businesses defend against cyberattacks." },
    { title: "Security Advice", icon: Zap, desc: "We guide companies on how to improve their cybersecurity and protect their systems." },
    { title: "Cyber Training", icon: FileSearch, desc: "We train teams to understand cyber risks and learn how to respond to attacks." },
    { title: "Security Support", icon: LifeBuoy, desc: "We help fix cybersecurity problems and support teams during system issues or attacks." }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-12">
      {expertises.map((exp, i) => (
        <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
          <div className="bg-blue-50 p-4 w-16 h-16 flex items-center justify-center rounded-xl text-[#0084d1] mb-6 group-hover:bg-[#0084d1] group-hover:text-white transition-colors">
            <exp.icon size={28} />
          </div>
          <h4 className="text-lg font-bold mb-3">{exp.title}</h4>
          <p className="text-sm text-gray-600 leading-relaxed">{exp.desc}</p>
        </div>
      ))}
    </div>
  );
};

export const NewsGrid = () => {
  const news = [
    { cat: "Consulting Business/ invena", title: "Future Proofing Your Business Approach", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400" },
    { cat: "Solution Model / invena", title: "Redefining Excellence in Business Strategy", img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=400" },
    { cat: "Modern Business/ invena", title: "Optimizing Your Approach to Modern", img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=400" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
      {news.map((item, i) => (
        <div key={i} className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all">
          <img src={item.img} className="w-full h-48 object-cover" alt="" />
          <div className="p-8">
            <p className="text-[#0084d1] text-xs font-semibold mb-3">{item.cat}</p>
            <h4 className="text-lg font-bold text-gray-900 mb-6 leading-tight">{item.title}</h4>
            <button className="flex items-center gap-2 text-gray-900 font-medium text-sm hover:gap-4 transition-all">
              <span
                className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                <ArrowRight size={14} className="text-gray-400" />
              </span>
              Read More
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
