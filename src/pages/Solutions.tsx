import React from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';

export const Solutions: React.FC = () => {
    return (
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
};
