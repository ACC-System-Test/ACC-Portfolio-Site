import React, { useState } from 'react';
import { useData } from '../services/DataContext';
import { Article } from '../services/types';
import { Trash2, Edit, Plus, X, Check, Search } from 'lucide-react';

export const ArticleManager: React.FC = () => {
    const { articles, categories, addArticle, updateArticle, deleteArticle } = useData();
    const [isEditing, setIsEditing] = useState(false);
    const [currentArticle, setCurrentArticle] = useState<Partial<Article>>({});
    const [searchTerm, setSearchTerm] = useState("");

    const filteredArticles = articles.filter(a =>
        a.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        const articleData = {
            ...currentArticle,
            slug: currentArticle.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'untitled',
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
        } as Article;

        if (currentArticle.id) {
            updateArticle(currentArticle.id, articleData);
        } else {
            addArticle(articleData as Omit<Article, 'id'>);
        }
        setIsEditing(false);
        setCurrentArticle({});
    };

    const handleEdit = (article: Article) => {
        setCurrentArticle(article);
        setIsEditing(true);
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this article?')) {
            deleteArticle(id);
        }
    };

    if (isEditing) {
        return (
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-xl font-bold">{currentArticle.id ? 'Edit Article' : 'New Article'}</h2>
                    <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-gray-100 rounded-full"><X size={20} /></button>
                </div>
                <form onSubmit={handleSave} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Title</label>
                            <input
                                required
                                value={currentArticle.title || ''}
                                onChange={e => setCurrentArticle({ ...currentArticle, title: e.target.value })}
                                className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-[#0084d1] outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Category</label>
                            <select
                                value={currentArticle.categoryId || ''}
                                onChange={e => setCurrentArticle({ ...currentArticle, categoryId: e.target.value })}
                                className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-[#0084d1] outline-none"
                            >
                                <option value="">Select Category</option>
                                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>
                        <div className="space-y-2 col-span-2">
                            <label className="text-sm font-bold text-gray-700">Image URL</label>
                            <input
                                value={currentArticle.imageUrl || ''}
                                onChange={e => setCurrentArticle({ ...currentArticle, imageUrl: e.target.value })}
                                className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-[#0084d1] outline-none"
                                placeholder="https://..."
                            />
                        </div>
                        <div className="space-y-2 col-span-2">
                            <label className="text-sm font-bold text-gray-700">Excerpt</label>
                            <textarea
                                value={currentArticle.excerpt || ''}
                                onChange={e => setCurrentArticle({ ...currentArticle, excerpt: e.target.value })}
                                className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-[#0084d1] outline-none h-24"
                            />
                        </div>
                        <div className="space-y-2 col-span-2">
                            <label className="text-sm font-bold text-gray-700">Content (HTML Supported)</label>
                            <textarea
                                value={currentArticle.content || ''}
                                onChange={e => setCurrentArticle({ ...currentArticle, content: e.target.value })}
                                className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-[#0084d1] outline-none h-64 font-mono text-sm"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={currentArticle.featured || false}
                                onChange={e => setCurrentArticle({ ...currentArticle, featured: e.target.checked })}
                                className="w-5 h-5 text-[#0084d1]"
                            />
                            <label className="text-sm font-bold text-gray-700">Featured Article</label>
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                        <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-2 rounded-lg font-bold text-gray-600 hover:bg-gray-100">Cancel</button>
                        <button type="submit" className="px-6 py-2 rounded-lg font-bold bg-[#0084d1] text-white hover:bg-[#006bb0]">Save Article</button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search articles..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0084d1]"
                    />
                </div>
                <button onClick={() => { setCurrentArticle({}); setIsEditing(true); }} className="flex items-center gap-2 bg-[#0084d1] text-white px-4 py-2 rounded-xl font-bold hover:bg-[#006bb0] transition-colors">
                    <Plus size={18} /> New Article
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="p-4 text-sm font-bold text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="p-4 text-sm font-bold text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="p-4 text-sm font-bold text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="p-4 text-sm font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredArticles.map(article => (
                            <tr key={article.id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4 font-medium text-gray-900">{article.title}</td>
                                <td className="p-4 text-gray-600 text-sm">
                                    <span className="bg-blue-50 text-[#0084d1] px-2 py-1 rounded text-xs font-bold uppercase">{categories.find(c => c.id === article.categoryId)?.name}</span>
                                </td>
                                <td className="p-4 text-gray-500 text-sm">{article.date}</td>
                                <td className="p-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button onClick={() => handleEdit(article)} className="p-2 text-gray-400 hover:text-[#0084d1] hover:bg-blue-50 rounded-lg transition-all"><Edit size={18} /></button>
                                        <button onClick={() => handleDelete(article.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={18} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
