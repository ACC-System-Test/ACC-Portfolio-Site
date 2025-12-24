
import React from 'react';
import { ArrowRight, Eye, Target, Rocket, ShieldCheck, Search, Code, LifeBuoy, FileSearch, Zap } from 'lucide-react';

export const MissionVisionSection = () => {
  const cards = [
    { title: "Our Goal", icon: Target, desc: "Reduce cyber threats by building skills, partnerships, and advanced capabilities." },
    { title: "Our Vision", icon: Eye, desc: "A secure digital Africa with empowered cybersecurity talent everywhere." },
    { title: "Our Mission", icon: Rocket, desc: "Strengthen cyber resilience through collaboration, training, innovation, and trusted solutions." }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch py-12">
      <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <div key={i} className="bg-gray-50 p-6 rounded-2xl flex flex-col items-center text-center">
            <div className="bg-blue-100 p-4 rounded-xl text-[#0084d1] mb-4">
              <card.icon size={32} />
            </div>
            <h4 className="font-bold mb-2">{card.title}</h4>
            <p className="text-xs text-gray-600 leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>
      <div className="lg:col-span-5 bg-[#0084d1] rounded-2xl p-8 text-white relative flex flex-col justify-between overflow-hidden">
        <div>
          <h3 className="text-xl font-bold mb-4">Who We Are</h3>
          <p className="text-sm opacity-90 leading-relaxed mb-6">
            Africa Cybersecurity Consortium (ACC) is a non-profit organization advancing cybersecurity development in Africa through skills training, stakeholder collaboration, research, innovation, and access to trusted security solutions for all sectors.
          </p>
          <p className="text-sm opacity-90 leading-relaxed">
            By reinvesting revenue into capacity-building, partnerships, youth empowerment, and community awareness, ACC strengthens cyber resilience and reduces threats across the continent — supporting a safer and digitally confident future for Africa.
          </p>
        </div>
        <div className="mt-8 flex items-center gap-4">
          <img src="https://picsum.photos/seed/ceo/100/100" className="w-12 h-12 rounded-full border-2 border-white/20" alt="CEO" />
          <p className="text-sm italic font-medium">CEO, Tuyishimire Jean Bonfils</p>
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
        <div key={i} className="bg-gray-50 p-8 rounded-2xl hover:shadow-md transition-all group">
          <div className="bg-blue-100 p-4 w-16 h-16 flex items-center justify-center rounded-xl text-[#0084d1] mb-6 group-hover:bg-[#0084d1] group-hover:text-white transition-colors">
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
              <span className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
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
