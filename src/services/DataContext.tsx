import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppData, Article, Category, Section, Event, Profile, Project, ThemeConfig } from './types';
import api from './api';

interface DataContextType extends AppData {
    loading: boolean;
    addArticle: (article: Omit<Article, 'id'>) => Promise<void>;
    updateArticle: (id: string, article: Partial<Article>) => Promise<void>;
    deleteArticle: (id: string) => Promise<void>;
    addCategory: (category: Omit<Category, 'id'>) => void;
    deleteCategory: (id: string) => void;
    addSection: (section: Omit<Section, 'id'>) => Promise<void>;
    updateSection: (id: string, section: Partial<Section>) => Promise<void>;
    deleteSection: (id: string) => Promise<void>;
    reorderSections: (newOrder: Section[]) => void;
    addEvent: (event: Omit<Event, 'id'>) => Promise<void>;
    updateEvent: (id: string, event: Partial<Event>) => Promise<void>;
    deleteEvent: (id: string) => Promise<void>;
    updateTheme: (config: Partial<ThemeConfig>) => void;
    addProfile: (profile: Omit<Profile, 'id'>) => Promise<void>;
    updateProfile: (id: string, profile: Partial<Profile>) => Promise<void>;
    deleteProfile: (id: string) => Promise<void>;
    addProject: (project: Omit<Project, 'id'>) => Promise<void>;
    updateProject: (id: string, project: Partial<Project>) => Promise<void>;
    deleteProject: (id: string) => Promise<void>;
    activeArticle: Article | null;
    setActiveArticle: (article: Article | null) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<ThemeConfig>({
        primaryColor: '#0084d1',
        secondaryColor: '#001f3f',
        fontFamily: '"Bricolage Grotesque", sans-serif',
        borderRadius: '1rem'
    });
    const [articles, setArticles] = useState<Article[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [sections, setSections] = useState<Section[]>([]);
    const [events, setEvents] = useState<Event[]>([]);
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [activeArticle, setActiveArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [artRes, catRes, evtRes, prfRes, projRes, secRes] = await Promise.all([
                api.get('/articles'),
                api.get('/categories'),
                api.get('/events'),
                api.get('/profiles'),
                api.get('/projects'),
                api.get('/resources?type=SECTION'),
            ]);

            // Robust data extraction (handling wrapped/unwrapped)
            const getArray = (res: any) => Array.isArray(res.data) ? res.data : (res.data?.data || []);

            setArticles(getArray(artRes));
            setCategories(getArray(catRes));
            setEvents(getArray(evtRes));
            setProfiles(getArray(prfRes));
            setProjects(getArray(projRes));

            // Sections mapping from Resource entity
            const sectionResources = getArray(secRes);
            setSections(sectionResources.map((r: any) => ({
                ...(r.metadata || {}),
                id: r.id,
                title: r.title || r.metadata?.title || 'Untitled Section'
            })));
        } catch (error) {
            console.error("Failed to fetch data from backend", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const addArticle = async (article: Omit<Article, 'id'>) => {
        try {
            const res = await api.post('/articles', article);
            setArticles(prev => [res.data, ...prev]);
        } catch (err) {
            console.error("Failed to add article", err);
            throw err;
        }
    };

    const updateArticle = async (id: string, article: Partial<Article>) => {
        try {
            const res = await api.patch(`/articles/${id}`, article);
            setArticles(prev => prev.map(a => a.id === id ? res.data : a));
        } catch (err) {
            console.error("Failed to update article", err);
            throw err;
        }
    };

    const deleteArticle = async (id: string) => {
        try {
            await api.delete(`/articles/${id}`);
            setArticles(prev => prev.filter(a => a.id !== id));
        } catch (err) {
            console.error("Failed to delete article", err);
            throw err;
        }
    };

    const addCategory = (category: Omit<Category, 'id'>) => {
        // Implement categories backend if needed
    };

    const deleteCategory = (id: string) => {
        // Implement categories backend if needed
    };

    const addSection = async (section: Omit<Section, 'id'>) => {
        try {
            const res = await api.post('/resources', {
                title: section.title,
                slug: `section-${Date.now()}`,
                type: 'SECTION',
                metadata: section,
                isPublished: true
            });
            setSections(prev => [...prev, { ...res.data.metadata, id: res.data.id }]);
        } catch (err) {
            console.error("Failed to add section", err);
            throw err;
        }
    };

    const updateSection = async (id: string, section: Partial<Section>) => {
        try {
            const res = await api.patch(`/resources/${id}`, {
                title: section.title,
                metadata: section
            });
            setSections(prev => prev.map(s => s.id === id ? { ...res.data.metadata, id: res.data.id } : s));
        } catch (err) {
            console.error("Failed to update section", err);
            // Local fallback
            setSections(prev => prev.map(s => s.id === id ? { ...s, ...section } : s));
        }
    };

    const deleteSection = async (id: string) => {
        // Sections currently semi-hardcoded or not yet migrated to specific table
        // Keeping it using resources endpoint for now if it exists, or local update
        try {
            await api.delete(`/resources/${id}`);
            setSections(prev => prev.filter(s => s.id !== id));
        } catch (err) {
            console.error("Failed to delete section", err);
            throw err;
        }
    };

    const reorderSections = (newOrder: Section[]) => {
        setSections(newOrder);
        // Implement reorder API if needed
    };

    const addEvent = async (event: Omit<Event, 'id'>) => {
        try {
            const res = await api.post('/events', event);
            setEvents(prev => [...prev, res.data]);
        } catch (err) {
            console.error("Failed to add event", err);
            throw err;
        }
    };

    const updateEvent = async (id: string, event: Partial<Event>) => {
        try {
            const res = await api.patch(`/events/${id}`, event);
            setEvents(prev => prev.map(e => e.id === id ? res.data : e));
        } catch (err) {
            console.error("Failed to update event", err);
            throw err;
        }
    };

    const deleteEvent = async (id: string) => {
        try {
            await api.delete(`/events/${id}`);
            setEvents(prev => prev.filter(e => e.id !== id));
        } catch (err) {
            console.error("Failed to delete event", err);
            throw err;
        }
    };

    const updateTheme = (config: Partial<ThemeConfig>) => {
        setTheme(prev => ({ ...prev, ...config }));
    };

    const addProfile = async (profile: Omit<Profile, 'id'>) => {
        try {
            const res = await api.post('/profiles', profile);
            setProfiles(prev => [...prev, res.data]);
        } catch (err) {
            console.error("Failed to add profile", err);
            throw err;
        }
    };

    const updateProfile = async (id: string, profile: Partial<Profile>) => {
        try {
            const res = await api.patch(`/profiles/${id}`, profile);
            setProfiles(prev => prev.map(p => p.id === id ? res.data : p));
        } catch (err) {
            console.error("Failed to update profile", err);
            throw err;
        }
    };

    const deleteProfile = async (id: string) => {
        try {
            await api.delete(`/profiles/${id}`);
            setProfiles(prev => prev.filter(p => p.id !== id));
        } catch (err) {
            console.error("Failed to delete profile", err);
            throw err;
        }
    };

    const addProject = async (project: Omit<Project, 'id'>) => {
        try {
            const res = await api.post('/projects', project);
            setProjects(prev => [...prev, res.data]);
        } catch (err) {
            console.error("Failed to add project", err);
            throw err;
        }
    };

    const updateProject = async (id: string, project: Partial<Project>) => {
        try {
            const res = await api.patch(`/projects/${id}`, project);
            setProjects(prev => prev.map(p => p.id === id ? res.data : p));
        } catch (err) {
            console.error("Failed to update project", err);
            throw err;
        }
    };

    const deleteProject = async (id: string) => {
        try {
            await api.delete(`/projects/${id}`);
            setProjects(prev => prev.filter(p => p.id !== id));
        } catch (err) {
            console.error("Failed to delete project", err);
            throw err;
        }
    };

    // Apply theme to CSS variables
    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--primary-color', theme.primaryColor);
        root.style.setProperty('--secondary-color', theme.secondaryColor);
        root.style.setProperty('--font-family', theme.fontFamily);
        root.style.setProperty('--border-radius', theme.borderRadius);
    }, [theme]);

    return (
        <DataContext.Provider value={{
            theme, articles, categories, sections, events, profiles, projects,
            loading,
            addArticle,
            updateArticle,
            deleteArticle,
            addCategory,
            deleteCategory,
            addSection,
            updateSection,
            deleteSection,
            reorderSections,
            addEvent,
            updateEvent,
            deleteEvent,
            updateTheme,
            addProfile,
            updateProfile,
            deleteProfile,
            addProject,
            updateProject,
            deleteProject,
            activeArticle,
            setActiveArticle
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
