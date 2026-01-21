import React from 'react';
import { X, Calendar } from 'lucide-react';
import { useData } from '../services/DataContext';

export const ArticleModal: React.FC = () => {
    const { activeArticle, setActiveArticle, categories } = useData();

    if (!activeArticle) return null;

    const getCategoryName = (catId: string) => {
        return categories.find(c => c.id === catId)?.name || 'General';
    };

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setActiveArticle(null)}
        >
            <div
                className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] shadow-2xl relative animate-in slide-in-from-bottom-10 duration-500"
                onClick={e => e.stopPropagation()}
            >
                <button
                    onClick={() => setActiveArticle(null)}
                    className="absolute top-6 right-6 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-10"
                >
                    <X size={24} className="text-gray-600" />
                </button>
                <div className="h-80 relative">
                    <img src={activeArticle.imageUrl || activeArticle.image} className="w-full h-full object-cover" alt={activeArticle.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-8 sm:p-12 text-white">
                        <span className="bg-[#0084d1] px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider mb-3 inline-block">{getCategoryName(activeArticle.categoryId)}</span>
                        <h2 className="text-3xl sm:text-4xl font-bold leading-tight">{activeArticle.title}</h2>
                    </div>
                </div>
                <div className="p-8 sm:p-12 space-y-6 text-lg text-gray-600 leading-relaxed">
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-4 font-semibold uppercase tracking-widest">
                        <Calendar size={16} /> {new Date(activeArticle.date).toLocaleDateString()}
                    </div>
                    <p className="text-xl text-gray-900 font-medium">{activeArticle.excerpt}</p>
                    <hr className="border-gray-100" />
                    <div className="article-content prose prose-lg max-w-none prose-blue">
                        {activeArticle.content.split('\n').map((para, i) => (
                            <p key={i} className="mb-4">{para}</p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
