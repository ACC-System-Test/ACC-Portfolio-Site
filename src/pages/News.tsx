import React, { useState } from 'react';
import { ArrowRight, Mail, Calendar, MapPin, X, Clock, ChevronRight } from 'lucide-react';
import { useData } from '../services/DataContext';
import { Article as ArticleType, Event as EventType } from '../services/types';

export const News: React.FC = () => {
    const { articles, events, categories, setActiveArticle } = useData();
    const [showEventModal, setShowEventModal] = useState(false);
    const [eventEmail, setEventEmail] = useState("");
    const [registrationStatus, setRegistrationStatus] = useState<'idle' | 'success' | 'error'>('idle');

    // Helper to get category name
    const getCategoryName = (catId: string) => {
        return categories.find(c => c.id === catId)?.name || 'General';
    };

    const handleEventRegister = (e: React.FormEvent) => {
        e.preventDefault();
        if (!eventEmail || !eventEmail.includes('@')) {
            setRegistrationStatus('error');
            return;
        }
        // Simulate API call
        setTimeout(() => {
            setRegistrationStatus('success');
            setTimeout(() => {
                setShowEventModal(false);
                setEventEmail("");
                setRegistrationStatus('idle');
            }, 2000);
        }, 1000);
    };

    return (
        <div className="space-y-24 pb-24 animate-in fade-in duration-700 relative">
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
                    {/* Main Content - News Feed */}
                    <div className="lg:col-span-8 space-y-16">
                        {articles.map((article) => (
                            <article key={article.id} className="group">
                                <div
                                    className="overflow-hidden rounded-[2.5rem] mb-8 shadow-xl cursor-pointer"
                                    onClick={() => setActiveArticle(article)}
                                >
                                    <img src={article.imageUrl || article.image} alt={article.title} className="w-full h-[450px] object-cover group-hover:scale-105 transition-transform duration-700" />
                                </div>
                                <div className="flex items-center gap-4 text-sm font-semibold text-[#0084d1] mb-4 uppercase tracking-widest">
                                    <span>{getCategoryName(article.categoryId)}</span>
                                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                    <span className="text-gray-500">{new Date(article.date).toLocaleDateString()}</span>
                                </div>
                                <h2
                                    className="text-4xl font-bold text-gray-900 mb-6 group-hover:text-[#0084d1] transition-colors leading-tight cursor-pointer"
                                    onClick={() => setActiveArticle(article)}
                                >
                                    {article.title}
                                </h2>
                                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                                    {article.excerpt}
                                </p>
                                <button
                                    onClick={() => setActiveArticle(article)}
                                    className="flex items-center gap-3 font-bold text-lg group-hover:gap-5 transition-all text-gray-900"
                                >
                                    Read Full Story <ArrowRight className="text-[#0084d1]" />
                                </button>
                            </article>
                        ))}
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4 space-y-12">

                        {/* Events Widget */}
                        <div className="bg-gray-900 text-white p-10 rounded-[2.5rem] relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0084d1] rounded-full blur-[80px] opacity-50"></div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-8">
                                    <Calendar className="text-[#0084d1]" size={28} />
                                    <h3 className="text-2xl font-bold">Upcoming Events</h3>
                                </div>

                                <div className="space-y-6">
                                    {events.length > 0 ? events.map(event => (
                                        <div key={event.id} className="bg-white/10 p-4 rounded-xl backdrop-blur-sm hover:bg-white/15 transition-colors cursor-pointer border border-white/5">
                                            <span className="text-[#0084d1] font-bold text-xs uppercase tracking-wider mb-1 block">{new Date(event.date).toLocaleDateString()}</span>
                                            <h4 className="font-bold text-lg mb-2">{event.title}</h4>
                                            <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                                                {event.type === 'Online' ? <Clock size={14} /> : <MapPin size={14} />}
                                                {event.location}
                                            </div>
                                            {event.registrationLink ? (
                                                <a
                                                    href={event.registrationLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-full block text-center py-2 bg-[#0084d1] rounded-lg font-semibold text-sm hover:bg-[#006bb0] transition-colors"
                                                >
                                                    Register Now
                                                </a>
                                            ) : (
                                                <button
                                                    onClick={() => setShowEventModal(true)}
                                                    className="w-full py-2 bg-[#0084d1] rounded-lg font-semibold text-sm hover:bg-[#006bb0] transition-colors"
                                                >
                                                    Interested
                                                </button>
                                            )}
                                        </div>
                                    )) : (
                                        <p className="text-gray-400 text-sm italic">No upcoming events scheduled.</p>
                                    )}
                                </div>
                            </div>
                        </div>

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
                                <input type="email" placeholder="Your Email" className="w-full bg-white/20 border-none rounded-xl p-4 text-white placeholder:text-white/60 focus:ring-2 focus:ring-white/50 outline-none" />
                                <button className="w-full bg-white text-[#0084d1] py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors">Subscribe</button>
                            </form>
                        </div>
                    </aside>
                </div>
            </section>


            {/* Event Registration Modal */}
            {showEventModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 relative animate-in scale-in-95 duration-300">
                        <button
                            onClick={() => setShowEventModal(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            <X size={24} />
                        </button>

                        {registrationStatus === 'success' ? (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Calendar size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Registration Confirmed!</h3>
                                <p className="text-gray-600">Check your email for the ticket and event details.</p>
                            </div>
                        ) : (
                            <>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Register for Event</h3>
                                <p className="text-gray-500 mb-6 text-sm">Enter your email to receive your secure entry ticket.</p>

                                <form onSubmit={handleEventRegister} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            required
                                            value={eventEmail}
                                            onChange={(e) => {
                                                setEventEmail(e.target.value);
                                                setRegistrationStatus('idle');
                                            }}
                                            className={`w-full bg-gray-50 border ${registrationStatus === 'error' ? 'border-red-300 ring-2 ring-red-100' : 'border-gray-200 focus:ring-2 focus:ring-[#0084d1]'} rounded-xl p-4 text-gray-900 outline-none transition-all`}
                                            placeholder="john@example.com"
                                        />
                                        {registrationStatus === 'error' && <p className="text-red-500 text-xs mt-2 pl-1">Please enter a valid email address.</p>}
                                    </div>
                                    <button type="submit" className="w-full bg-[#0084d1] hover:bg-[#006bb0] text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-200">
                                        Confirm Registration
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
