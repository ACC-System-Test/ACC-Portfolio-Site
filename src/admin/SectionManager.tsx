import React, { useState } from 'react';
import { useData } from '../services/DataContext';
import { Section } from '../services/types';
import { GripVertical, Trash2, Edit, Plus, X, Layers, Image, Users, Briefcase, FileText, CheckSquare, Map, Eye } from 'lucide-react';
import { ImageUpload } from '../components/ImageUpload';

export const SectionManager: React.FC = () => {
    const { sections, categories, addSection, updateSection, deleteSection } = useData();
    const [isEditing, setIsEditing] = useState(false);
    const [currentSection, setCurrentSection] = useState<Partial<Section>>({});
    const [selectedPage, setSelectedPage] = useState<string>('home');
    const [activeTab, setActiveTab] = useState<'general' | 'content'>('general');

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        const sectionData = {
            ...currentSection,
            page: currentSection.page || selectedPage,
            order: currentSection.order || (sections || []).filter(s => s.page === (currentSection.page || selectedPage)).length + 1
        } as Section;

        if (currentSection.id) {
            updateSection(currentSection.id, sectionData);
        } else {
            addSection(sectionData as Omit<Section, 'id'>);
        }
        setIsEditing(false);
        setCurrentSection({});
        setActiveTab('general');
    };

    const handleEdit = (section: Section) => {
        setCurrentSection(section);
        setIsEditing(true);
        setActiveTab('general');
    };

    const handleDelete = (id: string) => {
        if (confirm('Delete this section configuration?')) {
            deleteSection(id);
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'hero': return <Image size={16} />;
            case 'banner': return <Image size={16} />;
            case 'profiles': return <Users size={16} />;
            case 'projects': return <Briefcase size={16} />;
            case 'stats': return <CheckSquare size={16} />;
            case 'features': return <FileText size={16} />;
            case 'map': return <Map size={16} />;
            default: return <Layers size={16} />;
        }
    }

    if (isEditing) {
        return (
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden relative">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">{currentSection.id ? 'Edit Section' : 'Add New Section'}</h2>
                        <p className="text-sm text-gray-500">Configure how this section appears on the site.</p>
                    </div>
                    <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors"><X size={20} /></button>
                </div>

                <div className="flex border-b border-gray-100">
                    <button
                        onClick={() => setActiveTab('general')}
                        className={`flex-1 py-4 font-bold text-sm border-b-2 transition-colors ${activeTab === 'general' ? 'border-[#0084d1] text-[#0084d1]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                        General Settings
                    </button>
                    <button
                        onClick={() => setActiveTab('content')}
                        className={`flex-1 py-4 font-bold text-sm border-b-2 transition-colors ${activeTab === 'content' ? 'border-[#0084d1] text-[#0084d1]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                        Content Configuration
                    </button>
                </div>

                <form onSubmit={handleSave} className="p-8">
                    {activeTab === 'general' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-gray-700">Section Title</label>
                                    <input
                                        required
                                        value={currentSection.title || ''}
                                        onChange={e => setCurrentSection({ ...currentSection, title: e.target.value })}
                                        placeholder="e.g. Latest News"
                                        className="w-full border border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#0084d1] transition-shadow"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-gray-700">Page Assignment</label>
                                    <select
                                        value={currentSection.page || selectedPage}
                                        onChange={e => setCurrentSection({ ...currentSection, page: e.target.value as any })}
                                        className="w-full border border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#0084d1] bg-white"
                                    >
                                        <option value="home">Home Page</option>
                                        <option value="about">About Us</option>
                                        <option value="solutions">Solutions</option>
                                        <option value="contact">Contact</option>
                                        <option value="blog">Blog</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-bold text-gray-700">Section Type</label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {[
                                        { id: 'hero', label: 'Hero Banner', icon: Image },
                                        { id: 'features', label: 'Features Grid', icon: FileText },
                                        { id: 'stats', label: 'Statistics', icon: CheckSquare },
                                        { id: 'profiles', label: 'Team Profiles', icon: Users },
                                        { id: 'projects', label: 'Projects', icon: Briefcase },
                                        { id: 'grid', label: 'Article Grid', icon: Layers },
                                        { id: 'list', label: 'Article List', icon: Layers },
                                        { id: 'banner', label: 'Page Header', icon: Image },
                                    ].map(type => (
                                        <button
                                            key={type.id}
                                            type="button"
                                            onClick={() => {
                                                const newType = type.id as any;
                                                setCurrentSection({
                                                    ...currentSection,
                                                    type: newType,
                                                    sourceType: (newType === 'hero' || newType === 'banner' || newType === 'stats' || newType === 'features') ? 'manual' : newType === 'profiles' ? 'profiles' : newType === 'projects' ? 'projects' : 'latest'
                                                });
                                            }}
                                            className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${currentSection.type === type.id ? 'border-[#0084d1] bg-blue-50 text-[#0084d1]' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
                                        >
                                            <type.icon size={24} />
                                            <span className="text-xs font-bold">{type.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-bold text-gray-700">Order Priority</label>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="number"
                                        value={currentSection.order || 0}
                                        onChange={e => setCurrentSection({ ...currentSection, order: parseInt(e.target.value) })}
                                        className="w-24 border border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#0084d1]"
                                    />
                                    <p className="text-sm text-gray-500">Lower numbers appear first on the page.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'content' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                            {(currentSection.type === 'hero' || currentSection.type === 'banner') && (
                                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Image className="text-[#0084d1]" size={24} />
                                        <h3 className="font-bold text-lg text-gray-900">Banner Content</h3>
                                    </div>
                                    <div className="space-y-6">
                                        <ImageUpload
                                            label="Banner Background Image"
                                            value={currentSection.sourceConfig?.imageUrl || ''}
                                            onChange={url => setCurrentSection({ ...currentSection, sourceConfig: { ...currentSection.sourceConfig, imageUrl: url } })}
                                        />
                                        <div className="space-y-3">
                                            <label className="text-sm font-bold text-gray-700">Headline</label>
                                            <input
                                                value={currentSection.sourceConfig?.heroTitle || ''}
                                                onChange={e => setCurrentSection({ ...currentSection, sourceConfig: { ...currentSection.sourceConfig, heroTitle: e.target.value } })}
                                                placeholder="Enter a catchy headline..."
                                                className="w-full border border-gray-200 rounded-xl p-4 bg-white focus:ring-2 focus:ring-[#0084d1] outline-none"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-sm font-bold text-gray-700">Subtitle</label>
                                            <textarea
                                                value={currentSection.sourceConfig?.heroSubtitle || ''}
                                                onChange={e => setCurrentSection({ ...currentSection, sourceConfig: { ...currentSection.sourceConfig, heroSubtitle: e.target.value } })}
                                                placeholder="Enter a descriptive subtitle..."
                                                className="w-full border border-gray-200 rounded-xl p-4 bg-white h-32 focus:ring-2 focus:ring-[#0084d1] outline-none resize-none"
                                            />
                                        </div>
                                        {currentSection.type === 'hero' && (
                                            <div className="grid grid-cols-2 gap-6">
                                                <div className="space-y-3">
                                                    <label className="text-sm font-bold text-gray-700">CTA Text</label>
                                                    <input
                                                        value={currentSection.sourceConfig?.heroCtaText || ''}
                                                        onChange={e => setCurrentSection({ ...currentSection, sourceConfig: { ...currentSection.sourceConfig, heroCtaText: e.target.value } })}
                                                        placeholder="e.g. Get Started"
                                                        className="w-full border border-gray-200 rounded-xl p-4 bg-white text-sm"
                                                    />
                                                </div>
                                                <div className="space-y-3">
                                                    <label className="text-sm font-bold text-gray-700">CTA Link</label>
                                                    <input
                                                        value={currentSection.sourceConfig?.heroCtaLink || ''}
                                                        onChange={e => setCurrentSection({ ...currentSection, sourceConfig: { ...currentSection.sourceConfig, heroCtaLink: e.target.value } })}
                                                        placeholder="e.g. /solutions"
                                                        className="w-full border border-gray-200 rounded-xl p-4 bg-white text-sm"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {(currentSection.type === 'stats' || currentSection.type === 'features') && (
                                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <FileText className="text-[#0084d1]" size={24} />
                                        <h3 className="font-bold text-lg text-gray-900">Items Configuration</h3>
                                    </div>
                                    <p className="text-sm text-gray-600 bg-blue-50 p-4 rounded-xl border border-blue-100">
                                        Enter items as a JSON array. Each item should have a <code>label</code> and optionally a <code>value</code> (for stats) or <code>description</code>/<code>icon</code> (for features).
                                        <br />
                                        <span className="font-mono text-xs mt-2 block text-blue-600">Example: [{`{ "label": "Title", "value": "100" }`}]</span>
                                    </p>
                                    <textarea
                                        value={JSON.stringify(currentSection.sourceConfig?.items || [], null, 2)}
                                        onChange={e => {
                                            try {
                                                const items = JSON.parse(e.target.value);
                                                setCurrentSection({ ...currentSection, sourceConfig: { ...currentSection.sourceConfig, items } });
                                            } catch (err) {
                                                // Allow typing invalid JSON while editing
                                            }
                                        }}
                                        className="w-full border border-gray-200 rounded-xl p-4 bg-white h-64 font-mono text-sm focus:ring-2 focus:ring-[#0084d1] outline-none"
                                    />
                                </div>
                            )}

                            {(currentSection.type === 'grid' || currentSection.type === 'list') && (
                                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Layers className="text-[#0084d1]" size={24} />
                                        <h3 className="font-bold text-lg text-gray-900">Content Source</h3>
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <label className="text-sm font-bold text-gray-700">Source Type</label>
                                            <select
                                                value={currentSection.sourceType || 'latest'}
                                                onChange={e => setCurrentSection({ ...currentSection, sourceType: e.target.value as any, sourceConfig: {} })}
                                                className="w-full border border-gray-200 rounded-xl p-4 bg-white"
                                            >
                                                <option value="latest">Latest Updates</option>
                                                <option value="category">Specific Category</option>
                                                <option value="projects">Projects Source</option>
                                            </select>
                                        </div>
                                        {currentSection.sourceType === 'category' && (
                                            <div className="space-y-3">
                                                <label className="text-sm font-bold text-gray-700">Select Category</label>
                                                <select
                                                    value={currentSection.sourceConfig?.categoryId || ''}
                                                    onChange={e => setCurrentSection({
                                                        ...currentSection,
                                                        sourceConfig: { ...currentSection.sourceConfig, categoryId: e.target.value }
                                                    })}
                                                    className="w-full border border-gray-200 rounded-xl p-4 bg-white"
                                                >
                                                    <option value="">Choose a category...</option>
                                                    {(categories || []).map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                                </select>
                                            </div>
                                        )}
                                        <div className="space-y-3">
                                            <label className="text-sm font-bold text-gray-700">Item Limit</label>
                                            <input
                                                type="number" min="1" max="12"
                                                value={currentSection.sourceConfig?.limit || 3}
                                                onChange={e => setCurrentSection({ ...currentSection, sourceConfig: { ...currentSection.sourceConfig, limit: parseInt(e.target.value) } })}
                                                className="w-full border border-gray-200 rounded-xl p-4 bg-white"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {currentSection.type === 'profiles' && (
                                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Users className="text-[#0084d1]" size={24} />
                                        <h3 className="font-bold text-lg text-gray-900">Team Filter</h3>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-gray-700">Role Filter (Optional)</label>
                                        <select
                                            value={currentSection.sourceConfig?.profileType || ''}
                                            onChange={e => setCurrentSection({ ...currentSection, sourceConfig: { ...currentSection.sourceConfig, profileType: e.target.value } })}
                                            className="w-full border border-gray-200 rounded-xl p-4 bg-white"
                                        >
                                            <option value="">Show All Profiles</option>
                                            <option value="Staff">Staff Only</option>
                                            <option value="Board">Board Only</option>
                                            <option value="Volunteer">Volunteers Only</option>
                                        </select>
                                    </div>
                                </div>
                            )}

                            {currentSection.type === 'projects' && (
                                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Briefcase className="text-[#0084d1]" size={24} />
                                        <h3 className="font-bold text-lg text-gray-900">Project Configuration</h3>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-gray-700">Display Limit</label>
                                        <input
                                            type="number"
                                            value={currentSection.sourceConfig?.limit || 3}
                                            onChange={e => setCurrentSection({ ...currentSection, sourceConfig: { ...currentSection.sourceConfig, limit: parseInt(e.target.value) } })}
                                            className="w-full border border-gray-200 rounded-xl p-4 bg-white focus:ring-2 focus:ring-[#0084d1] outline-none"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 italic">This will display the most recent projects up to the specified limit.</p>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="flex justify-end gap-3 pt-8 mt-8 border-t border-gray-100">
                        <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-colors">Cancel</button>
                        <button type="submit" className="px-8 py-3 rounded-xl font-bold bg-[#0084d1] text-white hover:bg-[#006bb0] shadow-lg shadow-blue-500/20 transition-all hover:scale-105" style={{ backgroundColor: 'var(--primary-color)' }}>
                            {currentSection.id ? 'Save Changes' : 'Create Section'}
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Page Builder</h2>
                    <p className="text-gray-500">Manage and organize content sections for your pages.</p>
                </div>
                <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
                    <span className="text-sm font-bold text-gray-500 pl-3">Editing:</span>
                    <select
                        value={selectedPage}
                        onChange={(e) => setSelectedPage(e.target.value)}
                        className="bg-gray-50 border-0 rounded-xl px-4 py-2 font-bold text-gray-900 focus:ring-2 focus:ring-[#0084d1] cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                        <option value="home">Home Page</option>
                        <option value="about">About Page</option>
                        <option value="solutions">Solutions Page</option>
                        <option value="contact">Contact Page</option>
                        <option value="blog">Blog Page</option>
                    </select>
                </div>
            </div>

            <button
                onClick={() => { setCurrentSection({ type: 'grid', sourceType: 'latest', sourceConfig: { limit: 3 }, page: selectedPage as any }); setIsEditing(true); setActiveTab('general'); }}
                className="w-full py-6 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-400 hover:border-[#0084d1] hover:text-[#0084d1] hover:bg-blue-50/50 transition-all group cursor-pointer"
            >
                <div className="bg-gray-100 p-3 rounded-full mb-2 group-hover:bg-[#0084d1] group-hover:text-white transition-colors">
                    <Plus size={24} />
                </div>
                <span className="font-bold">Add New Section</span>
            </button>

            <div className="space-y-4">
                {(sections || [])
                    .filter(s => s && s.page === selectedPage)
                    .sort((a, b) => (a.order || 0) - (b.order || 0))
                    .map((section, index) => (
                        <div key={section.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-all relative overflow-hidden">
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0084d1]" style={{ backgroundColor: 'var(--primary-color)' }}></div>
                            <div className="flex items-center gap-6">
                                <span className="p-2 text-gray-300 hover:text-gray-600 cursor-move"><GripVertical size={20} /></span>
                                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0084d1] flex items-center justify-center">
                                    {getTypeIcon(section.type)}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-gray-900 flex items-center gap-3">
                                        {section.title}
                                        <span className="text-xs font-bold px-2 py-1 bg-gray-100 text-gray-500 rounded-full uppercase tracking-wider">{section.type}</span>
                                    </h3>
                                    <p className="text-sm text-gray-400">Order: {section.order}</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <a href={`/${selectedPage === 'home' ? '' : selectedPage}`} target="_blank" rel="noopener noreferrer" className="p-3 text-gray-400 hover:text-[#0084d1] hover:bg-blue-50 rounded-xl transition-all" title="Preview on Site">
                                    <Eye size={20} />
                                </a>
                                <button onClick={() => handleEdit(section)} className="p-3 text-gray-400 hover:text-[#0084d1] hover:bg-blue-50 rounded-xl transition-all" title="Edit Section">
                                    <Edit size={20} />
                                </button>
                                <button onClick={() => handleDelete(section.id)} className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all" title="Delete Section">
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}

                {(sections || []).filter(s => s.page === selectedPage).length === 0 && (
                    <div className="text-center py-16">
                        <Layers size={48} className="mx-auto text-gray-200 mb-4" />
                        <h3 className="text-lg font-bold text-gray-900">No Sections Yet</h3>
                        <p className="text-gray-500">Start building your page by adding a new section above.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
