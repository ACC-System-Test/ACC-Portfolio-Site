import React, { useState } from 'react';
import { useData } from '../services/DataContext';
import { Article } from '../services/types';
import { Trash2, Edit, Plus, X, Search } from 'lucide-react';
import { ImageUpload } from '../components/ImageUpload';

export const ArticleManager: React.FC = () => {
    const { articles, categories, addArticle, updateArticle, deleteArticle } = useData();
    const [isEditing, setIsEditing] = useState(false);
    const [currentArticle, setCurrentArticle] = useState<Partial<Article>>({});
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');

    const filteredArticles = (articles || []).filter(a =>
        a && a.title && a.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        const articleData = {
            ...currentArticle,
            slug: currentArticle.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'untitled',
            date: currentArticle.date || new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
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
        setActiveTab('edit');
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this article?')) {
            deleteArticle(id);
        }
    };

    if (isEditing) {
        return (
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div>
                        <h2 className="text-xl font-bold">{currentArticle.id ? 'Edit Article' : 'Compose New Article'}</h2>
                        <p className="text-xs text-gray-500">Draft your story and keep your audience informed.</p>
                    </div>
                    <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors"><X size={20} /></button>
                </div>

                <div className="flex border-b border-gray-100">
                    <button
                        onClick={() => setActiveTab('edit')}
                        className={`px-8 py-4 font-bold text-sm border-b-2 transition-colors ${activeTab === 'edit' ? 'border-[#0084d1] text-[#0084d1]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                        Editor
                    </button>
                    <button
                        onClick={() => setActiveTab('preview')}
                        className={`px-8 py-4 font-bold text-sm border-b-2 transition-colors ${activeTab === 'preview' ? 'border-[#0084d1] text-[#0084d1]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                        Live Preview
                    </button>
                </div>

                <form onSubmit={handleSave} className="p-8">
                    {activeTab === 'edit' ? (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main Content Area */}
                            <div className="lg:col-span-2 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Article Title</label>
                                    <input
                                        required
                                        value={currentArticle.title || ''}
                                        onChange={e => setCurrentArticle({ ...currentArticle, title: e.target.value })}
                                        placeholder="Enter title here..."
                                        className="w-full border-b-2 border-gray-100 py-3 text-2xl font-bold focus:border-[#0084d1] outline-none transition-colors"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Short Excerpt</label>
                                    <textarea
                                        value={currentArticle.excerpt || ''}
                                        onChange={e => setCurrentArticle({ ...currentArticle, excerpt: e.target.value })}
                                        className="w-full border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-[#0084d1] outline-none h-24 resize-none text-gray-600"
                                        placeholder="A brief summary for the news feed..."
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Main Content (Markdown/HTML)</label>
                                    <textarea
                                        value={currentArticle.content || ''}
                                        onChange={e => setCurrentArticle({ ...currentArticle, content: e.target.value })}
                                        className="w-full border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-[#0084d1] outline-none h-[400px] font-mono text-sm leading-relaxed"
                                        placeholder="Write your article content here..."
                                    />
                                </div>
                            </div>

                            {/* Sidebar Settings */}
                            <div className="space-y-8 bg-gray-50 p-6 rounded-2xl border border-gray-100 h-fit">
                                <ImageUpload
                                    label="Cover Image"
                                    value={currentArticle.imageUrl}
                                    onChange={url => setCurrentArticle({ ...currentArticle, imageUrl: url })}
                                />

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Category</label>
                                    <select
                                        value={currentArticle.categoryId || ''}
                                        onChange={e => setCurrentArticle({ ...currentArticle, categoryId: e.target.value })}
                                        className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-[#0084d1] outline-none bg-white font-medium"
                                    >
                                        <option value="">Uncategorized</option>
                                        {(categories || []).map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                    </select>
                                </div>

                                <div className="p-4 bg-white rounded-xl border border-gray-100 flex items-center justify-between shadow-sm">
                                    <div className="flex flex-col">
                                        <label className="text-sm font-bold text-gray-900">Featured</label>
                                        <span className="text-[10px] text-gray-500 font-medium">Show on homepage</span>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={currentArticle.featured || false}
                                        onChange={e => setCurrentArticle({ ...currentArticle, featured: e.target.checked })}
                                        className="w-6 h-6 rounded-lg text-[#0084d1] cursor-pointer"
                                    />
                                </div>
                                <div className="p-4 bg-[#0084d1]/5 rounded-xl border border-[#0084d1]/10">
                                    <p className="text-[10px] text-[#0084d1] font-bold uppercase mb-1">Status</p>
                                    <p className="text-sm font-bold text-gray-700">{currentArticle.id ? 'Published' : 'Draft'}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="max-w-3xl mx-auto space-y-8 py-4">
                            {currentArticle.imageUrl && <img src={currentArticle.imageUrl} className="w-full aspect-video object-cover rounded-3xl shadow-lg" alt="" />}
                            <div className="space-y-4">
                                <h1 className="text-4xl font-extrabold text-gray-900">{currentArticle.title || 'Untitled Article'}</h1>
                                <div className="flex gap-4 text-sm text-gray-500 font-medium">
                                    <span>{new Date().toLocaleDateString()}</span>
                                    <span>•</span>
                                    <span>{(categories || []).find(c => c.id === currentArticle.categoryId)?.name || 'General'}</span>
                                </div>
                            </div>
                            <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: currentArticle.content || '<p class="italic text-gray-400">No content written yet.</p>' }} />
                        </div>
                    )}

                    <div className="flex justify-end gap-3 pt-8 mt-8 border-t border-gray-100">
                        <button type="button" onClick={() => setIsEditing(false)} className="px-8 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors">Discard</button>
                        <button type="submit" className="px-10 py-3 rounded-xl font-bold bg-[#0084d1] text-white hover:bg-[#006bb0] shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02]">
                            {currentArticle.id ? 'Update Article' : 'Publish Article'}
                        </button>
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
                                    <span className="bg-blue-50 text-[#0084d1] px-2 py-1 rounded text-xs font-bold uppercase">
                                        {(categories || []).find(c => c.id === article.categoryId)?.name || 'Uncategorized'}
                                    </span>
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
