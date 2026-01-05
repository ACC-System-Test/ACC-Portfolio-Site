export type ContentLayout = 'grid' | 'list' | 'featured' | 'hero' | 'slideshow' | 'profiles' | 'projects' | 'stats' | 'features' | 'banner' | 'cta' | 'map';

export interface ThemeConfig {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    borderRadius: string;
}

export interface Profile {
    id: string;
    name: string;
    role: string;
    bio: string;
    imageUrl: string;
    type: 'Staff' | 'Volunteer' | 'Intern' | 'Board';
}

export interface Project {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    status: 'Ongoing' | 'Completed' | 'Upcoming';
    link?: string;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
}

export interface Article {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    author: string;
    date: string;
    categoryId: string;
    imageUrl: string;
    featured?: boolean;
}

export interface Section {
    id: string;
    title: string;
    type: ContentLayout;
    page: 'home' | 'about' | 'solutions' | 'contact' | 'blog';
    order: number;
    sourceType: 'latest' | 'category' | 'manual' | 'profiles' | 'projects';
    sourceConfig?: {
        categoryId?: string;
        articleIds?: string[];
        profileType?: string; // For filtering profiles
        limit?: number;
        // Hero/Banner config
        heroTitle?: string;
        heroSubtitle?: string;
        heroImage?: string;
        heroCtaText?: string;
        heroCtaLink?: string;
        // Generic Features/Stats Content (JSON structure for flexibility)
        items?: Array<{
            label: string;
            value?: string;
            description?: string;
            icon?: string;
            link?: string;
        }>;
        mapConfig?: {
            lat: number;
            lng: number;
            address: string;
        };
    };
}

export interface Event {
    id: string;
    title: string;
    date: string;
    location: string;
    type: 'Online' | 'In-Person';
    registrationLink?: string;
}

export interface AppData {
    theme: ThemeConfig;
    articles: Article[];
    categories: Category[];
    sections: Section[];
    events: Event[];
    profiles: Profile[];
    projects: Project[];
}
