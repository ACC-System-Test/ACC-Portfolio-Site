import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Layers, Tag, Menu, X, Shield, Calendar, Palette, Users, Briefcase } from 'lucide-react';

export const AdminLayout: React.FC = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const location = useLocation();

    const navItems = [
        { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
        { label: 'Articles', path: '/admin/articles', icon: FileText },
        { label: 'Events', path: '/admin/events', icon: Calendar },
        { label: 'Profiles', path: '/admin/profiles', icon: Users },
        { label: 'Projects', path: '/admin/projects', icon: Briefcase },
        { label: 'Sections', path: '/admin/sections', icon: Layers },
        { label: 'Theme', path: '/admin/theme', icon: Palette },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 bg-[#001f3f] text-white w-64 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform z-30 lg:relative lg:translate-x-0`}>
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-xl">
                        <Shield className="text-[#0084d1]" /> ADMIN
                    </div>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
                        <X />
                    </button>
                </div>
                <nav className="p-4 space-y-2">
                    {navItems.map(item => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${location.pathname === item.path
                                ? 'bg-[#0084d1] text-white font-bold'
                                : 'text-gray-300 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            <item.icon size={20} />
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <header className="bg-white border-b border-gray-200 p-4 flex items-center gap-4">
                    <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                        <Menu />
                    </button>
                    <h1 className="text-xl font-bold text-gray-800">Content Management System</h1>
                </header>
                <div className="flex-1 overflow-auto p-6 md:p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};
