import React from 'react';
import { MissionVisionSection } from '../components/Sections';
import { OrganizationStructure } from '../components/OrganizationStructure';
import { Linkedin, Twitter } from 'lucide-react';
import { useData } from '../services/DataContext';

export const About: React.FC = () => {
    const { profiles } = useData();

    // Filter for Staff/Board to show in leadership section
    const leadership = profiles.filter(p => p.type === 'Staff' || p.type === 'Board');
    return (
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
                        {leadership.length > 0 ? leadership.map((leader, i) => (
                            <div key={leader.id} className="group relative overflow-hidden rounded-[2.5rem] bg-gray-50 aspect-[4/5] shadow-sm hover:shadow-2xl transition-all">
                                <img src={leader.imageUrl || `https://i.pravatar.cc/300?img=${i + 10}`} alt={leader.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                                <div className="absolute bottom-0 left-0 p-8 text-white w-full">
                                    <h4 className="text-2xl font-bold mb-1">{leader.name}</h4>
                                    <p className="text-white/70 font-medium mb-4">{leader.role}</p>
                                    <div className="flex gap-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                        <Linkedin size={20} className="hover:text-blue-400 cursor-pointer" />
                                        <Twitter size={20} className="hover:text-blue-400 cursor-pointer" />
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="col-span-full py-12 text-center text-gray-400 italic">
                                Leadership details coming soon.
                            </div>
                        )}
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
};
