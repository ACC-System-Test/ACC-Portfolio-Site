import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { Article } from '../services/types';

interface ArticleCardProps {
    article: Article;
    variant?: 'grid' | 'list' | 'featured';
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, variant = 'grid' }) => {
    if (variant === 'list') {
        return (
            <div className="flex gap-6 items-start group">
                <div className="w-32 h-32 rounded-xl overflow-hidden shrink-0">
                    <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                        <Calendar size={12} /> {article.date}
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2 group-hover:text-[#0084d1] transition-colors line-clamp-2">
                        <Link to={`/blog/${article.slug}`}>{article.title}</Link>
                    </h4>
                    <Link to={`/blog/${article.slug}`} className="text-sm font-semibold text-[#0084d1] flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read <ArrowRight size={14} />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <article className="group bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all h-full flex flex-col">
            <div className="h-64 overflow-hidden relative">
                <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                {article.featured && (
                    <span className="absolute top-4 right-4 bg-[#0084d1] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        Featured
                    </span>
                )}
            </div>
            <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs font-semibold text-[#0084d1] mb-4 uppercase tracking-widest">
                    {article.author && <span className="flex items-center gap-1"><User size={12} /> {article.author}</span>}
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <span>{article.date}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-[#0084d1] transition-colors leading-tight">
                    <Link to={`/blog/${article.slug}`}>
                        {article.title}
                    </Link>
                </h3>

                <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed flex-grow">
                    {article.excerpt}
                </p>

                <Link to={`/blog/${article.slug}`} className="flex items-center gap-2 font-bold text-gray-900 group-hover:gap-4 transition-all mt-auto">
                    Read Full Story <ArrowRight className="text-[#0084d1]" size={18} />
                </Link>
            </div>
        </article>
    );
};
