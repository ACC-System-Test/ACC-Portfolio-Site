import React from 'react';
import { useData } from '../services/DataContext';
import { FileText, Layers, Tag, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
    const { articles, sections, categories, events } = useData();

    const stats = [
        { label: 'Total Articles', val: articles.length, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-100' },
        { label: 'Active Sections', val: sections.length, icon: Layers, color: 'text-purple-600', bg: 'bg-purple-100' },
        { label: 'Upcoming Events', val: events.length, icon: Tag, color: 'text-orange-600', bg: 'bg-orange-100' },
        { label: 'Categories', val: categories.length, icon: Tag, color: 'text-green-600', bg: 'bg-green-100' },
    ];

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                            <stat.icon size={24} />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                            <p className="text-2xl font-bold text-gray-900">{stat.val}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg text-gray-900">Quick Actions</h3>
                </div>
                <div className="flex gap-4">
                    <Link to="/admin/articles" className="flex items-center gap-2 bg-[#0084d1] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#006bb0] transition-colors">
                        Create Article <ArrowUpRight size={18} />
                    </Link>
                    <Link to="/admin/sections" className="flex items-center gap-2 border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors">
                        Manage Homepage
                    </Link>
                </div>
            </div>
        </div>
    );
};
