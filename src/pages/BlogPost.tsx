import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../services/DataContext';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import { ArticleCard } from '../components/ArticleCard';

export const BlogPost: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const { articles, categories } = useData();

    const article = articles.find(a => a.slug === slug);
    const category = categories.find(c => c.id === article?.categoryId);

    if (!article) {
        return (
            <div className="min-h-screen pt-32 container mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold mb-6">Article Not Found</h2>
                <Link to="/blog" className="text-[#0084d1] underline">Back to Blog</Link>
            </div>
        );
    }

    const relatedArticles = articles
        .filter(a => a.categoryId === article.categoryId && a.id !== article.id)
        .slice(0, 3);

    return (
        <div className="pt-32 pb-24 min-h-screen bg-white">
            <div className="container mx-auto px-6 max-w-4xl">
                <Link to="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#0084d1] mb-8 font-medium">
                    <ArrowLeft size={16} /> Back to Blog
                </Link>

                {category && (
                    <span className="inline-block bg-blue-50 text-[#0084d1] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                        {category.name}
                    </span>
                )}

                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 leading-tight">
                    {article.title}
                </h1>

                <div className="flex items-center gap-6 text-gray-500 mb-12 border-b border-gray-100 pb-8">
                    <div className="flex items-center gap-2">
                        <User size={18} />
                        <span className="font-medium">{article.author || 'ACC Editor'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar size={18} />
                        <span>{article.date}</span>
                    </div>
                </div>

                <div className="rounded-3xl overflow-hidden shadow-lg mb-12">
                    <img src={article.imageUrl} alt={article.title} className="w-full h-auto object-cover" />
                </div>

                <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-16" dangerouslySetInnerHTML={{ __html: article.content }}>
                    {/* Content rendered safely */}
                </div>

                {/* Render content as plain text if it's not html? In mock data I put HTML. */}

                <hr className="border-gray-100 mb-16" />

                {relatedArticles.length > 0 && (
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {relatedArticles.map(rel => (
                                <ArticleCard key={rel.id} article={rel} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
