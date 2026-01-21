import React, { useState } from 'react';
import { useData } from '../services/DataContext';
import { Project } from '../services/types';
import { Trash2, Edit, Plus, X, Search, ShieldCheck } from 'lucide-react';
import { ImageUpload } from '../components/ImageUpload';

export const ProjectManager: React.FC = () => {
    const { projects, addProject, updateProject, deleteProject } = useData();
    const [isEditing, setIsEditing] = useState(false);
    const [currentProject, setCurrentProject] = useState<Partial<Project>>({});
    const [searchTerm, setSearchTerm] = useState("");

    const filteredProjects = (projects || []).filter(p =>
        p && p.title && p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const projectData = {
            ...currentProject,
            status: currentProject.status || 'Ongoing'
        } as Project;

        if (currentProject.id) {
            await updateProject(currentProject.id, projectData);
        } else {
            await addProject(projectData as Omit<Project, 'id'>);
        }
        setIsEditing(false);
        setCurrentProject({});
    };

    const handleEdit = (project: Project) => {
        setCurrentProject(project);
        setIsEditing(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this project?')) {
            await deleteProject(id);
        }
    };

    if (isEditing) {
        return (
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">{currentProject.id ? 'Edit Project' : 'Initiate New Project'}</h2>
                        <p className="text-sm text-gray-500">Track initiatives and security solutions.</p>
                    </div>
                    <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors"><X size={24} /></button>
                </div>

                <form onSubmit={handleSave} className="p-10 space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        <div className="lg:col-span-1">
                            <ImageUpload
                                label="Project Cover"
                                value={currentProject.imageUrl}
                                onChange={url => setCurrentProject({ ...currentProject, imageUrl: url })}
                            />
                            <div className="mt-8 p-6 bg-[#0084d1]/5 rounded-2xl border border-[#0084d1]/10">
                                <div className="flex items-center gap-2 mb-3">
                                    <ShieldCheck size={20} className="text-[#0084d1]" />
                                    <span className="text-xs font-bold text-[#0084d1] uppercase mt-0.5">Project Scope</span>
                                </div>
                                <p className="text-xs text-gray-600 leading-relaxed">Projects are displayed on the Solutions page. High-quality visuals represent our impact.</p>
                            </div>
                        </div>

                        <div className="lg:col-span-2 space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Project Title</label>
                                <input
                                    required
                                    value={currentProject.title || ''}
                                    onChange={e => setCurrentProject({ ...currentProject, title: e.target.value })}
                                    placeholder="e.g. National Cyber Defense Initiative"
                                    className="w-full border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-[#0084d1] outline-none transition-all text-lg font-bold"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Status</label>
                                    <select
                                        value={currentProject.status || 'Ongoing'}
                                        onChange={e => setCurrentProject({ ...currentProject, status: e.target.value as any })}
                                        className="w-full border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-[#0084d1] outline-none bg-white font-medium"
                                    >
                                        <option value="Ongoing">Ongoing</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Upcoming">Upcoming</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Date/Timeline</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. 2024 - 2025"
                                        className="w-full border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-[#0084d1] outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Project Description</label>
                                <textarea
                                    required
                                    value={currentProject.description || ''}
                                    onChange={e => setCurrentProject({ ...currentProject, description: e.target.value })}
                                    className="w-full border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-[#0084d1] outline-none h-48 resize-none leading-relaxed"
                                    placeholder="Describe the project's objectives, methods, and outcomes..."
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Project External Link</label>
                                <input
                                    value={currentProject.link || ''}
                                    onChange={e => setCurrentProject({ ...currentProject, link: e.target.value })}
                                    placeholder="e.g. https://project-dashboard.com"
                                    className="w-full border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-[#0084d1] outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-10 border-t border-gray-100">
                        <button type="button" onClick={() => setIsEditing(false)} className="px-8 py-4 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors">Discard</button>
                        <button type="submit" className="px-12 py-4 rounded-xl font-bold bg-[#0084d1] text-white hover:bg-[#006bb0] shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02]">
                            {currentProject.id ? 'Save Changes' : 'Launch Project'}
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
                <div className="relative w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search projects..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#0084d1] focus:ring-4 focus:ring-blue-50 outline-none transition-all font-medium"
                    />
                </div>
                <button onClick={() => { setCurrentProject({}); setIsEditing(true); }} className="flex items-center gap-2 bg-[#0084d1] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#006bb0] shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02]">
                    <Plus size={20} /> New Project
                </button>
            </div>

            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="p-6 text-sm font-bold text-gray-500 uppercase tracking-wider">Project Details</th>
                            <th className="p-6 text-sm font-bold text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="p-6 text-sm font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredProjects.length > 0 ? filteredProjects.map(project => (
                            <tr key={project.id} className="hover:bg-gray-50 transition-colors group">
                                <td className="p-6 font-medium text-gray-900 flex items-center gap-6">
                                    <div className="w-24 h-16 rounded-2xl bg-gray-100 overflow-hidden shadow-sm flex-shrink-0">
                                        <img src={project.imageUrl || 'https://via.placeholder.com/200x150'} alt={project.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <span className="font-bold text-gray-900 truncate text-lg">{project.title}</span>
                                        <span className="text-sm text-gray-500 line-clamp-1">{project.description}</span>
                                    </div>
                                </td>
                                <td className="p-6">
                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${project.status === 'Completed' ? 'bg-green-100 text-green-600' :
                                        project.status === 'Upcoming' ? 'bg-yellow-100 text-yellow-600' : 'bg-blue-100 text-blue-600'
                                        }`}>
                                        {project.status}
                                    </span>
                                </td>
                                <td className="p-6 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button onClick={() => handleEdit(project)} className="p-2 text-gray-400 hover:text-[#0084d1] hover:bg-blue-50 rounded-xl transition-all"><Edit size={20} /></button>
                                        <button onClick={() => handleDelete(project.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={20} /></button>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={3} className="p-20 text-center">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                                            <ShieldCheck size={40} />
                                        </div>
                                        <p className="text-gray-500 font-medium italic">No projects found. Time to start something new?</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
