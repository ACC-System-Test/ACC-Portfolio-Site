import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AdminLayout } from './admin/AdminLayout';
import { Dashboard } from './admin/Dashboard';
import { ArticleManager } from './admin/ArticleManager';
import { SectionManager } from './admin/SectionManager';
import { EventManager } from './admin/EventManager';
import { ProfileManager } from './admin/ProfileManager';
import { ProjectManager } from './admin/ProjectManager';
import { ThemeManager } from './admin/ThemeManager';

const AdminApp: React.FC = () => {
    return (
        <Routes>
            <Route element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="articles" element={<ArticleManager />} />
                <Route path="sections" element={<SectionManager />} />
                <Route path="events" element={<EventManager />} />
                <Route path="profiles" element={<ProfileManager />} />
                <Route path="projects" element={<ProjectManager />} />
                <Route path="theme" element={<ThemeManager />} />
            </Route>
        </Routes>
    );
};

export default AdminApp;
