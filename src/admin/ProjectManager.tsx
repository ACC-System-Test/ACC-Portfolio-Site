import React, { useState } from 'react';
import { useData } from '../services/DataContext';
import { Project } from '../services/types';
import { Trash2, Plus, X, Search, Briefcase } from 'lucide-react';

export const ProjectManager: React.FC = () => {
    const { projects, addProject, deleteProject } = useData();
    const [isEditing, setIsEditing] = useState(false);
    const [currentProject, setCurrentProject] = useState<Partial<Project>>({});
    const [searchTerm, setSearchTerm] = useState("");

    const filteredProjects = projects.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        addProject(currentProject as Omit<Project, 'id'>);
        setIsEditing(false);
        setCurrentProject({});
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this project?')) {
            deleteProject(id);
        }
    };

    if (isEditing) {
        return (
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-xl font-bold">New Project</h2>
                    <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-gray-100 rounded-full"><X size={20} /></button>
                </div>
                <form onSubmit={handleSave} className="p-6 space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Project Title</label>
                        <input
                            required
                            value={currentProject.title || ''}
                            onChange={e => setCurrentProject({ ...currentProject, title: e.target.value })}
                            className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#0084d1]"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Description</label>
                        <textarea
                            required
                            value={currentProject.description || ''}
                            onChange={e => setCurrentProject({ ...currentProject, description: e.target.value })}
                            className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#0084d1]"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Status</label>
                            <select
                                value={currentProject.status || 'Ongoing'}
                                onChange={e => setCurrentProject({ ...currentProject, status: e.target.value as any })}
                                className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#0084d1]"
                            >
                                <option value="Ongoing">Ongoing</option>
                                <option value="Completed">Completed</option>
                                <option value="Upcoming">Upcoming</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Image URL</label>
                            <input
                                value={currentProject.imageUrl || ''}
                                onChange={e => setCurrentProject({ ...currentProject, imageUrl: e.target.value })}
                                className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#0084d1]"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                        <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-2 rounded-lg font-bold text-gray-600 hover:bg-gray-100">Cancel</button>
                        <button type="submit" className="px-6 py-2 rounded-lg font-bold bg-[#0084d1] text-white hover:bg-[#006bb0]" style={{ backgroundColor: 'var(--primary-color)' }}>Save Project</button>
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
                        placeholder="Search projects..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0084d1]"
                    />
                </div>
                <button onClick={() => { setCurrentProject({}); setIsEditing(true); }} className="flex items-center gap-2 bg-[#0084d1] text-white px-4 py-2 rounded-xl font-bold hover:bg-[#006bb0] transition-colors" style={{ backgroundColor: 'var(--primary-color)' }}>
                    <Plus size={18} /> Add Project
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="p-4 text-sm font-bold text-gray-500 uppercase tracking-wider">Project</th>
                            <th className="p-4 text-sm font-bold text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="p-4 text-sm font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredProjects.map(project => (
                            <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4 font-medium text-gray-900 flex items-center gap-3">
                                    <div className="w-16 h-10 rounded-lg bg-gray-200 overflow-hidden">
                                        <img src={project.imageUrl || 'https://via.placeholder.com/100'} alt={project.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <div className="font-bold">{project.title}</div>
                                        <div className="text-xs text-gray-500 line-clamp-1">{project.description}</div>
                                    </div>
                                </td>
                                <td className="p-4 text-gray-600 text-sm">
                                    <span className={`px-2 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${project.status === 'Ongoing' ? 'bg-green-100 text-green-700' :
                                            project.status === 'Completed' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {project.status}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <button onClick={() => handleDelete(project.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={18} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
