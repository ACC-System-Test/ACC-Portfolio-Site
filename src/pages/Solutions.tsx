import React from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { useData } from '../services/DataContext';

export const Solutions: React.FC = () => {
    const { projects } = useData();
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
                    {projects.length > 0 ? projects.map((project, i) => (
                        <div key={project.id} className="group bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all overflow-hidden flex flex-col h-full">
                            <div className="aspect-video relative overflow-hidden">
                                <img
                                    src={project.imageUrl || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800'}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-6 right-6">
                                    <span className={`text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full backdrop-blur-md shadow-lg ${project.status === 'Ongoing' ? 'bg-orange-500/90 text-white' :
                                        project.status === 'Completed' ? 'bg-green-500/90 text-white' : 'bg-blue-500/90 text-white'
                                        }`}>
                                        {project.status}
                                    </span>
                                </div>
                            </div>
                            <div className="p-10 flex-1 flex flex-col">
                                <div className="mb-6">
                                    <ShieldCheck size={32} className="text-[#0084d1] mb-6" />
                                    <h3 className="text-2xl font-bold mb-4 text-gray-900 leading-tight">{project.title}</h3>
                                    <p className="text-gray-600 leading-relaxed line-clamp-3">{project.description}</p>
                                </div>

                                <div className="mt-auto">
                                    {project.link ? (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 font-bold text-[#0084d1] hover:gap-4 transition-all"
                                        >
                                            View Project Dashboard <ArrowRight size={18} />
                                        </a>
                                    ) : (
                                        <button className="inline-flex items-center gap-2 font-bold text-gray-400 cursor-not-allowed">
                                            Details Restricted <ShieldCheck size={18} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="col-span-full py-12 text-center text-gray-400 italic bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                            Our security solutions and ongoing initiatives will be displayed here shortly.
                        </div>
                    )}
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
