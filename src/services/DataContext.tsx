import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppData, Article, Category, Section, Event, Profile, Project, ThemeConfig } from './types';
import { storage } from './storage';
import { INITIAL_DATA } from './mockData';

interface DataContextType extends AppData {
    loading: boolean;
    addArticle: (article: Omit<Article, 'id'>) => void;
    updateArticle: (id: string, article: Partial<Article>) => void;
    deleteArticle: (id: string) => void;
    addCategory: (category: Omit<Category, 'id'>) => void;
    deleteCategory: (id: string) => void;
    addSection: (section: Omit<Section, 'id'>) => void;
    updateSection: (id: string, section: Partial<Section>) => void;
    deleteSection: (id: string) => void;
    reorderSections: (newOrder: Section[]) => void;
    addEvent: (event: Omit<Event, 'id'>) => void;
    updateEvent: (id: string, event: Partial<Event>) => void;
    deleteEvent: (id: string) => void;
    // New Features
    updateTheme: (config: Partial<ThemeConfig>) => void;
    addProfile: (profile: Omit<Profile, 'id'>) => void;
    deleteProfile: (id: string) => void;
    addProject: (project: Omit<Project, 'id'>) => void;
    deleteProject: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [data, setData] = useState<AppData>({
        ...INITIAL_DATA,
        theme: INITIAL_DATA.theme || { primaryColor: '#0084d1', secondaryColor: '#001f3f', fontFamily: '"Bricolage Grotesque", sans-serif', borderRadius: '1rem' },
        events: INITIAL_DATA.events || [],
        profiles: INITIAL_DATA.profiles || [],
        projects: INITIAL_DATA.projects || []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loaded = storage.load();
        if (loaded) {
            setData({
                ...loaded,
                theme: loaded.theme || INITIAL_DATA.theme,
                // Advanced Merge: unique user sections + forced update of system sections from INITIAL_DATA
                sections: [
                    ...(loaded.sections || []).filter((s: Section) => s.id && /^\d+$/.test(s.id)), // Keep user created (numeric IDs)
                    ...INITIAL_DATA.sections // Always use fresh system sections (allows us to fix content/design via code)
                ],
                events: loaded.events || [],
                profiles: loaded.profiles || [],
                projects: loaded.projects || []
            });
        } else {
            storage.save(INITIAL_DATA);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (!loading) {
            storage.save(data);
        }
    }, [data, loading]);

    const addArticle = (article: Omit<Article, 'id'>) => {
        const newArticle = { ...article, id: Date.now().toString() };
        setData(prev => ({ ...prev, articles: [newArticle, ...prev.articles] }));
    };

    const updateArticle = (id: string, updates: Partial<Article>) => {
        setData(prev => ({
            ...prev,
            articles: prev.articles.map(a => a.id === id ? { ...a, ...updates } : a)
        }));
    };

    const deleteArticle = (id: string) => {
        setData(prev => ({
            ...prev,
            articles: prev.articles.filter(a => a.id !== id)
        }));
    };

    const addCategory = (category: Omit<Category, 'id'>) => {
        const newCategory = { ...category, id: Date.now().toString() };
        setData(prev => ({ ...prev, categories: [...prev.categories, newCategory] }));
    };

    const deleteCategory = (id: string) => {
        setData(prev => ({
            ...prev,
            categories: prev.categories.filter(c => c.id !== id)
        }));
    };

    const addSection = (section: Omit<Section, 'id'>) => {
        const newSection = { ...section, id: Date.now().toString() };
        setData(prev => ({ ...prev, sections: [...prev.sections, newSection] }));
    };

    const updateSection = (id: string, updates: Partial<Section>) => {
        setData(prev => ({
            ...prev,
            sections: prev.sections.map(s => s.id === id ? { ...s, ...updates } : s)
        }));
    };

    const deleteSection = (id: string) => {
        setData(prev => ({
            ...prev,
            sections: prev.sections.filter(s => s.id !== id)
        }));
    };

    const reorderSections = (newOrder: Section[]) => {
        setData(prev => ({ ...prev, sections: newOrder }));
    };

    const addEvent = (event: Omit<Event, 'id'>) => {
        const newEvent = { ...event, id: Date.now().toString() };
        setData(prev => ({ ...prev, events: [...prev.events, newEvent] }));
    };

    const updateEvent = (id: string, updates: Partial<Event>) => {
        setData(prev => ({
            ...prev,
            events: prev.events.map(e => e.id === id ? { ...e, ...updates } : e)
        }));
    };

    const deleteEvent = (id: string) => {
        setData(prev => ({
            ...prev,
            events: prev.events.filter(e => e.id !== id)
        }));
    };

    const updateTheme = (config: Partial<ThemeConfig>) => {
        setData(prev => ({ ...prev, theme: { ...prev.theme, ...config } }));
    };

    const addProfile = (profile: Omit<Profile, 'id'>) => {
        const newProfile = { ...profile, id: Date.now().toString() };
        setData(prev => ({ ...prev, profiles: [...prev.profiles, newProfile] }));
    };

    const deleteProfile = (id: string) => {
        setData(prev => ({ ...prev, profiles: prev.profiles.filter(p => p.id !== id) }));
    };

    const addProject = (project: Omit<Project, 'id'>) => {
        const newProject = { ...project, id: Date.now().toString() };
        setData(prev => ({ ...prev, projects: [...prev.projects, newProject] }));
    };

    const deleteProject = (id: string) => {
        setData(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== id) }));
    };

    // Apply theme to CSS variables
    useEffect(() => {
        if (data.theme) {
            const root = document.documentElement;
            root.style.setProperty('--primary-color', data.theme.primaryColor);
            root.style.setProperty('--secondary-color', data.theme.secondaryColor);
            root.style.setProperty('--font-family', data.theme.fontFamily);
            root.style.setProperty('--border-radius', data.theme.borderRadius);
        }
    }, [data.theme]);

    return (
        <DataContext.Provider value={{
            ...data,
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
            deleteProfile,
            addProject,
            deleteProject
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
