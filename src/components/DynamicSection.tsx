import React from 'react';
import { Section, Article, Profile, Project } from '../services/types';
import { useData } from '../services/DataContext';
import { ShieldCheck, ArrowRight, Target, Eye, Award } from 'lucide-react';
import { NewsGrid } from './Sections';

interface DynamicSectionProps {
    section: Section;
}

export const DynamicSection: React.FC<DynamicSectionProps> = ({ section }) => {
    const { articles, profiles, projects } = useData();

    switch (section.type) {
        case 'hero':
        case 'banner':
            const isBanner = section.type === 'banner';
            const bannerConfig = section.sourceConfig || {};
            return (
                <section className={`${isBanner ? 'py-16 bg-gray-900' : 'hero-gradient min-h-[80vh]'} flex items-center relative overflow-hidden`}>
                    <div className="container mx-auto px-6 max-w-7xl relative z-10">
                        <div className={isBanner ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl pt-20'}>
                            <h1 className={`${isBanner ? 'text-4xl md:text-5xl' : 'text-5xl md:text-7xl'} font-extrabold text-white mb-6 leading-tight tracking-tight`}>
                                {bannerConfig.heroTitle || section.title}
                            </h1>
                            <p className={`${isBanner ? 'text-lg opacity-80' : 'text-xl opacity-90'} text-white mb-10 leading-relaxed`}>
                                {bannerConfig.heroSubtitle || section.subtitle || section.content}
                            </p>
                            {bannerConfig.heroCtaText && (
                                <a
                                    href={bannerConfig.heroCtaLink || '#'}
                                    className="inline-block bg-[#0084d1] hover:bg-[#006bb0] text-white px-8 py-4 rounded-xl font-bold transition-all shadow-xl hover:-translate-y-1"
                                >
                                    {bannerConfig.heroCtaText}
                                </a>
                            )}
                        </div>
                    </div>
                    {bannerConfig.imageUrl && (
                        <div className={`absolute right-0 top-0 ${isBanner ? 'w-full h-full opacity-10' : 'w-1/2 h-full opacity-20'} pointer-events-none`}>
                            <img src={bannerConfig.imageUrl} alt="" className="w-full h-full object-cover" />
                        </div>
                    )}
                </section>
            );

        case 'features':
        case 'stats':
            const isStats = section.type === 'stats';
            const items = Array.isArray(section.sourceConfig?.items) ? section.sourceConfig.items : [];
            return (
                <section className="py-24 container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">{section.title}</h2>
                        {section.subtitle && <p className="text-gray-600 max-w-2xl mx-auto">{section.subtitle}</p>}
                    </div>
                    <div className={`grid grid-cols-1 ${isStats ? 'md:grid-cols-4' : 'md:grid-cols-3'} gap-8`}>
                        {items.map((item: any, i: number) => (
                            <div key={i} className={`${isStats ? 'bg-blue-50/50' : 'bg-white shadow-sm'} p-8 rounded-3xl border border-gray-100 hover:shadow-xl transition-all text-center`}>
                                {!isStats && (
                                    <div className="w-12 h-12 bg-blue-50 text-[#0084d1] rounded-2xl flex items-center justify-center mb-6 mx-auto">
                                        <ShieldCheck size={24} />
                                    </div>
                                )}
                                {isStats && (
                                    <div className="text-4xl font-black text-[#001f3f] mb-2">{item.value}</div>
                                )}
                                <h3 className="text-xl font-bold mb-3">{item.label || item.title}</h3>
                                {item.description && <p className="text-gray-600 leading-relaxed">{item.description}</p>}
                            </div>
                        ))}
                    </div>
                </section>
            );

        case 'profiles':
            const filteredProfiles = section.sourceConfig?.profileType
                ? profiles.filter(p => p.type === section.sourceConfig.profileType)
                : profiles;
            return (
                <section className="py-24 bg-gray-50">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold mb-4">{section.title}</h2>
                            {section.subtitle && <p className="text-gray-600 max-w-2xl mx-auto">{section.subtitle}</p>}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            {filteredProfiles.map((profile) => (
                                <div key={profile.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all group">
                                    <div className="aspect-square relative overflow-hidden">
                                        <img src={profile.imageUrl || 'https://via.placeholder.com/300'} alt={profile.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                    </div>
                                    <div className="p-6 text-center">
                                        <h4 className="font-bold text-lg text-gray-900">{profile.name}</h4>
                                        <p className="text-[#0084d1] text-sm font-medium">{profile.role}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            );

        case 'grid':
        case 'list':
            const isList = section.type === 'list';
            const limit = section.sourceConfig?.limit || 3;
            // Generalized source handling
            const itemsSource = section.sourceType === 'projects' ? projects : articles;
            const displayItems = itemsSource.slice(0, limit);

            return (
                <section className="py-24 bg-gray-50">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <div className="mb-12">
                            <h2 className="text-4xl font-bold text-gray-900">{section.title}</h2>
                            {section.subtitle && <p className="text-gray-600 mt-2">{section.subtitle}</p>}
                        </div>
                        {isList ? (
                            <div className="space-y-6">
                                {displayItems.map((item: any) => (
                                    <div key={item.id} className="bg-white p-6 rounded-3xl border border-gray-100 flex gap-6 items-center hover:shadow-lg transition-all group cursor-pointer">
                                        <div className="w-32 h-24 rounded-2xl overflow-hidden flex-shrink-0">
                                            <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-xl mb-1 group-hover:text-[#0084d1] transition-colors">{item.title || item.name}</h4>
                                            <p className="text-gray-500 text-sm line-clamp-1">{item.excerpt || item.description}</p>
                                        </div>
                                        <ArrowRight className="text-gray-300 group-hover:text-[#0084d1] group-hover:translate-x-2 transition-all" size={24} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            section.sourceType === 'projects' ? (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                                    {projects.slice(0, limit).map((project) => (
                                        <div key={project.id} className="group bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all overflow-hidden flex flex-col h-full">
                                            <div className="aspect-video relative overflow-hidden">
                                                <img
                                                    src={project.imageUrl || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800'}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                            </div>
                                            <div className="p-8 flex-1 flex flex-col">
                                                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                                                <p className="text-gray-600 text-sm mb-6 line-clamp-3">{project.description}</p>
                                                <div className="mt-auto text-[#0084d1] font-bold text-sm">View Project</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : <NewsGrid />
                        )}
                    </div>
                </section>
            );

        case 'projects':
            // Direct projects section (often used for specialized displays)
            return (
                <section className="py-24">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <div className="mb-12 text-center">
                            <h2 className="text-4xl font-bold text-gray-900">{section.title}</h2>
                            {section.subtitle && <p className="text-gray-600 mt-2">{section.subtitle}</p>}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            {projects.slice(0, 3).map((project) => (
                                <div key={project.id} className="group bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all overflow-hidden flex flex-col h-full">
                                    <div className="aspect-video relative overflow-hidden">
                                        <img
                                            src={project.imageUrl || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800'}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="p-8 flex-1 flex flex-col">
                                        <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                                        <p className="text-gray-600 text-sm mb-6 line-clamp-3">{project.description}</p>
                                        <div className="mt-auto">
                                            {project.link ? (
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 font-bold text-[#0084d1] text-sm group-hover:gap-3 transition-all"
                                                >
                                                    View Details <ArrowRight size={16} />
                                                </a>
                                            ) : (
                                                <span className="text-gray-400 text-sm italic font-medium">Restricted Access</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            );

        case 'mission-vision':
            return (
                <section className="py-24 container mx-auto px-6 max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="bg-gradient-to-br from-[#0084d1]/5 to-blue-50/50 p-12 rounded-[3rem] border border-[#0084d1]/10">
                            <Target className="text-[#0084d1] mb-6" size={48} />
                            <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
                            <p className="text-gray-600 text-lg leading-relaxed">{section.content || "To serve as Africa's premier platform for cybersecurity collaboration..."}</p>
                        </div>
                        <div className="bg-gradient-to-br from-indigo-50/50 to-purple-50/50 p-12 rounded-[3rem] border border-indigo-100/50">
                            <Eye className="text-indigo-600 mb-6" size={48} />
                            <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
                            <p className="text-gray-600 text-lg leading-relaxed">{section.subtitle || "A resilient and secure digital future for all of Africa."}</p>
                        </div>
                    </div>
                </section>
            );

        default:
            return (
                <div className="py-12 text-center text-gray-400 border border-dashed border-gray-200 rounded-3xl mx-6">
                    <p className="font-medium">Section type "{section.type}" is being developed.</p>
                </div>
            );
    }
};