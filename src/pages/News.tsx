import React, { useState } from 'react';
import { ArrowRight, Mail, Calendar, MapPin, X, Clock, ChevronRight } from 'lucide-react';

interface Article {
    id: number;
    title: string;
    category: string;
    date: string;
    image: string;
    excerpt: string;
    content: string;
}

const articles: Article[] = [
    {
        id: 1,
        title: "The Rise of Ransomware in Sub-Saharan Africa: How to Prepare",
        category: "Expert Analysis",
        date: "Oct 24, 2023",
        image: "https://picsum.photos/seed/21/1000/600",
        excerpt: "As digital transformation accelerates across the continent, so do the sophisticated methods of cyber criminals. In this deep dive, our lead researcher explores the latest trends in regional cyber-extortion.",
        content: "Ransomware attacks in Africa have increased by 40% in the last year, targeting critical infrastructure and financial institutions. Organizations must adopt a proactive security posture, including regular backups, network segmentation, and employee training. This article details specific case studies and provides a comprehensive checklist for preparedness..."
    },
    {
        id: 2,
        title: "Data Privacy Laws: What the New Regulations Mean for Startups",
        category: "Policy Update",
        date: "Sep 15, 2023",
        image: "https://picsum.photos/seed/22/1000/600",
        excerpt: "With new data protection acts coming into force across several nations, startups need to be compliant from day one. We break down the legalese into actionable steps.",
        content: "Navigating the complex landscape of data privacy laws can be daunting for new businesses. However, compliance is not just a legal requirement but a competitive advantage. We discuss the key pillars of the new regulations, including consent management, data localization, and user rights..."
    },
    {
        id: 3,
        title: "Bridging the Cyber Skills Gap: ACC's 2024 Initiative",
        category: "Community",
        date: "Aug 02, 2023",
        image: "https://picsum.photos/seed/23/1000/600",
        excerpt: "We are launching a continent-wide training program to certify 5,000 new cybersecurity professionals. Learn how you can get involved or nominate a candidate.",
        content: "The cybersecurity skills gap is a global challenge, but it is particularly acute in Africa. Our 2024 initiative aims to address this by providing scholarships, mentorship, and hands-on training to aspiring security professionals. We are partnering with leading tech companies and universities to deliver world-class education..."
    }
];

export const News: React.FC = () => {
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
    const [showEventModal, setShowEventModal] = useState(false);
    const [eventEmail, setEventEmail] = useState("");
    const [registrationStatus, setRegistrationStatus] = useState<'idle' | 'success' | 'error'>('idle');

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
                                    onClick={() => setSelectedArticle(article)}
                                >
                                    <img src={article.image} alt={article.title} className="w-full h-[450px] object-cover group-hover:scale-105 transition-transform duration-700" />
                                </div>
                                <div className="flex items-center gap-4 text-sm font-semibold text-[#0084d1] mb-4 uppercase tracking-widest">
                                    <span>{article.category}</span>
                                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                    <span className="text-gray-500">{article.date}</span>
                                </div>
                                <h2
                                    className="text-4xl font-bold text-gray-900 mb-6 group-hover:text-[#0084d1] transition-colors leading-tight cursor-pointer"
                                    onClick={() => setSelectedArticle(article)}
                                >
                                    {article.title}
                                </h2>
                                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                                    {article.excerpt}
                                </p>
                                <button
                                    onClick={() => setSelectedArticle(article)}
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
                                    <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm hover:bg-white/15 transition-colors cursor-pointer border border-white/5">
                                        <span className="text-[#0084d1] font-bold text-xs uppercase tracking-wider mb-1 block">Nov 15, 2023</span>
                                        <h4 className="font-bold text-lg mb-2">Kigali Cyber Summit</h4>
                                        <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                                            <MapPin size={14} /> Kigali Convention Centre
                                        </div>
                                        <button
                                            onClick={() => setShowEventModal(true)}
                                            className="w-full py-2 bg-[#0084d1] rounded-lg font-semibold text-sm hover:bg-[#006bb0] transition-colors"
                                        >
                                            Register Now
                                        </button>
                                    </div>

                                    <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm hover:bg-white/15 transition-colors cursor-pointer border border-white/5">
                                        <span className="text-[#0084d1] font-bold text-xs uppercase tracking-wider mb-1 block">Dec 05, 2023</span>
                                        <h4 className="font-bold text-lg mb-2">Ethical Hacking Workshop</h4>
                                        <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                                            <Clock size={14} /> Online Webinar
                                        </div>
                                        <button
                                            onClick={() => setShowEventModal(true)}
                                            className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg font-semibold text-sm transition-colors"
                                        >
                                            Join Waitlist
                                        </button>
                                    </div>
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

            {/* Article Detail Modal */}
            {selectedArticle && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setSelectedArticle(null)}>
                    <div
                        className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative animate-in slide-in-from-bottom-10 duration-500"
                        onClick={e => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedArticle(null)}
                            className="absolute top-6 right-6 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-10"
                        >
                            <X size={24} className="text-gray-600" />
                        </button>
                        <div className="h-80 relative">
                            <img src={selectedArticle.image} className="w-full h-full object-cover" alt={selectedArticle.title} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-8 sm:p-12 text-white">
                                <span className="bg-[#0084d1] px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider mb-3 inline-block">{selectedArticle.category}</span>
                                <h2 className="text-3xl sm:text-4xl font-bold leading-tight">{selectedArticle.title}</h2>
                            </div>
                        </div>
                        <div className="p-8 sm:p-12 space-y-6 text-lg text-gray-600 leading-relaxed">
                            <div className="flex items-center gap-2 text-sm text-gray-400 mb-4 font-semibold uppercase tracking-widest">
                                <Calendar size={16} /> {selectedArticle.date}
                            </div>
                            <p className="text-xl text-gray-900 font-medium">{selectedArticle.excerpt}</p>
                            <hr className="border-gray-100" />
                            <p>{selectedArticle.content}</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </div>
                    </div>
                </div>
            )}

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
