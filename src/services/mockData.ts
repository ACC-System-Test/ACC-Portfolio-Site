import { AppData } from './types';

export const INITIAL_DATA: AppData = {
    theme: {
        primaryColor: '#0084d1',
        secondaryColor: '#001f3f',
        fontFamily: '"Bricolage Grotesque", sans-serif',
        borderRadius: '1rem',
    },
    categories: [
        { id: '1', name: 'Expert Analysis', slug: 'expert-analysis' },
        { id: '2', name: 'Policy Update', slug: 'policy-update' },
        { id: '3', name: 'Community', slug: 'community' },
        { id: '4', name: 'Threat Intel', slug: 'threat-intel' }
    ],
    articles: [
        {
            id: '1',
            title: "The Rise of Ransomware in Sub-Saharan Africa: How to Prepare",
            slug: "rise-of-ransomware-africa",
            excerpt: "As digital transformation accelerates across the continent, so do the sophisticated methods of cyber criminals. In this deep dive, our lead researcher explores the latest trends in regional cyber-extortion.",
            content: "<p>Ransomware attacks in Africa have increased by 40% in the last year...</p>",
            author: "Dr. Amani K.",
            date: "Oct 24, 2026",
            categoryId: '1',
            imageUrl: "https://picsum.photos/seed/21/1000/600",
            featured: true
        },
        {
            id: '2',
            title: "Data Privacy Laws: What the New Regulations Mean for Startups",
            slug: "data-privacy-laws-startups",
            excerpt: "With new data protection acts coming into force, startups need to be compliant from day one.",
            content: "<p>Navigating the complex landscape of data privacy laws...</p>",
            author: "Sarah J.",
            date: "Sep 15, 2026",
            categoryId: '2',
            imageUrl: "https://picsum.photos/seed/22/1000/600"
        },
        {
            id: '3',
            title: "Bridging the Cyber Skills Gap: ACC's 2024 Initiative",
            slug: "bridging-cyber-skills-gap",
            excerpt: "We are launching a continent-wide training program to certify 5,000 new cybersecurity professionals. Learn how you can get involved or nominate a candidate.",
            content: "<p>The cybersecurity skills gap is a global challenge, but it is particularly acute in Africa...</p>",
            author: "Marcus Okafor",
            date: "Aug 02, 2023",
            categoryId: '3',
            imageUrl: "https://picsum.photos/seed/23/1000/600"
        }
    ],
    sections: [
        // --- HOME PAGE ---
        {
            id: 'home-hero',
            title: 'Home Hero',
            type: 'hero',
            page: 'home',
            order: 0,
            sourceType: 'manual',
            sourceConfig: {
                heroTitle: "Strengthening Africa's Cyber Resilience",
                heroSubtitle: "Africa's premier non-profit consortium dedicated to advancing cybersecurity through education, research, and collective defense.",
                heroCtaText: "Explore Our Solutions",
                heroCtaLink: "/solutions"
            }
        },
        {
            id: 'home-stats',
            title: 'Impact Statistics',
            type: 'stats',
            page: 'home',
            order: 1,
            sourceType: 'manual',
            sourceConfig: {
                items: [
                    { label: "Active Members", value: "500+" },
                    { label: "Projects Completed", value: "128" },
                    { label: "Partner Nations", value: "15" },
                    { label: "Lives Impacted", value: "25k" }
                ]
            }
        },
        {
            id: 'home-expertise',
            title: 'Our Expertise',
            type: 'features',
            page: 'home',
            order: 2,
            sourceType: 'manual',
            sourceConfig: {
                heroTitle: "Comprehensive protection for the digital landscape",
                // Note: Ideally we'd have a full list here, but for brevity/demo I'll let the renderer handle default if empty, 
                // or effectively migrated:
                items: [
                    { label: "Threat Intelligence", description: "Real-time monitoring and analysis of regional cyber threats.", icon: "Shield" },
                    { label: "Capacity Building", description: "Training programs for government and private sector.", icon: "Users" },
                    { label: "Policy Advocacy", description: "Shaping legislation for a secure digital future.", icon: "FileText" },
                    { label: "Incident Response", description: "Rapid deployment teams for critical infrastructure breaches.", icon: "Activity" }
                ]
            }
        },
        {
            id: 'home-latest',
            title: 'Latest Updates',
            type: 'grid',
            page: 'home',
            order: 3,
            sourceType: 'latest',
            sourceConfig: { limit: 3 }
        },
        // --- ABOUT PAGE ---
        {
            id: 'about-hero',
            title: 'About Banner',
            type: 'banner',
            page: 'about',
            order: 0,
            sourceType: 'manual',
            sourceConfig: {
                heroTitle: "Securing the Continent's Digital Sovereignty",
                heroSubtitle: "The Africa Cybersecurity Consortium is a collective force of experts, policy makers, and technology leaders. Established 2021."
            }
        },
        {
            id: 'about-team',
            title: 'Our Leadership',
            type: 'profiles',
            page: 'about',
            order: 2,
            sourceType: 'profiles',
            sourceConfig: { profileType: 'Staff' } // Displaying Staff as leadership for now
        },
        // --- SOLUTIONS PAGE ---
        {
            id: 'solutions-hero',
            title: 'Solutions Banner',
            type: 'banner',
            page: 'solutions',
            order: 0,
            sourceType: 'manual',
            sourceConfig: {
                heroTitle: "Security Solutions Built for Africa",
                heroSubtitle: "From critical infrastructure protection to individual training programs, we provide the tools to defend and thrive."
            }
        },
        {
            id: 'solutions-features',
            title: 'Our Ecosystem',
            type: 'features',
            page: 'solutions',
            order: 1,
            sourceType: 'manual',
            sourceConfig: {
                items: [
                    { label: "Public Sector Defense", description: "Strengthening government data integrity and citizen services protection.", icon: "Building" },
                    { label: "Enterprise Resilience", description: "Advanced threat detection and incident response for the African business sector.", icon: "Briefcase" },
                    { label: "Academic Outreach", description: "Developing world-class cybersecurity curricula for universities.", icon: "GraduationCap" }
                ]
            }
        },
        {
            id: 'solutions-projects',
            title: 'Ongoing Projects',
            type: 'projects',
            page: 'solutions',
            order: 2,
            sourceType: 'projects',
            sourceConfig: { limit: 6 }
        },
        // --- CONTACT PAGE ---
        {
            id: 'contact-hero',
            title: 'Contact Banner',
            type: 'banner',
            page: 'contact',
            order: 0,
            sourceType: 'manual',
            sourceConfig: {
                heroTitle: "Let's Talk Security",
                heroSubtitle: "Available for collaboration, policy consulting, and organizational training."
            }
        },
        {
            id: 'contact-info',
            title: 'Contact Information',
            type: 'features', // Reusing features for info cards
            page: 'contact',
            order: 1,
            sourceType: 'manual', // Reusing features styled differently
            sourceConfig: {
                items: [
                    { label: "Our Headquarters", description: "Cyber Hub, Plot 2231, Financial District, Kigali, Rwanda", icon: "MapPin" },
                    { label: "Call Us", description: "+250 788 000 000", icon: "Phone" },
                    { label: "Email Us", description: "contact@acc-africa.org", icon: "Mail" }
                ]
            }
        }
    ],
    events: [
        {
            id: '1',
            title: 'Kigali Cyber Summit',
            date: 'Nov 15, 2026',
            location: 'Kigali Convention Centre',
            type: 'In-Person'
        },
        {
            id: '2',
            title: 'Ethical Hacking Workshop',
            date: 'Dec 05, 2026',
            location: 'Online Webinar',
            type: 'Online'
        }
    ],
    profiles: [
        {
            id: '1',
            name: 'Tuyishimire Jean Bonfils',
            role: 'Chief Executive Officer',
            bio: 'Leading the ACC strategic vision.',
            imageUrl: 'https://i.pravatar.cc/300?img=68',
            type: 'Staff'
        },
        {
            id: '2',
            name: 'Dr. Elena Mbeki',
            role: 'Head of Research',
            bio: 'PhD in Cryptography with 15 years experience.',
            imageUrl: 'https://i.pravatar.cc/300?img=44',
            type: 'Staff'
        },
        {
            id: '3',
            name: 'Marcus Okafor',
            role: 'Strategic Partnerships',
            bio: 'Connecting public and private sectors.',
            imageUrl: 'https://i.pravatar.cc/300?img=11',
            type: 'Staff'
        },
        {
            id: '4',
            name: 'Amina Diallo',
            role: 'Policy & Advocacy',
            bio: 'Former consultant to the AU.',
            imageUrl: 'https://i.pravatar.cc/300?img=32',
            type: 'Staff'
        }
    ],
    projects: [
        {
            id: '1',
            title: 'Cyber Guard Africa',
            description: 'Training 10,000 students in ethical hacking and secure coding.',
            status: 'Ongoing',
            imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000'
        },
        {
            id: '2',
            title: 'SecureGov Initiative',
            description: 'Auditing and hardening digital infrastructure for 5 partner nations.',
            status: 'Ongoing',
            imageUrl: 'https://picsum.photos/seed/gov/800/600'
        },
        {
            id: '3',
            title: 'TechAware Campaign',
            description: 'Public awareness campaign reaching 5 million citizens.',
            status: 'Completed',
            imageUrl: 'https://picsum.photos/seed/tech/800/600'
        }
    ]
};
