import { DataSource } from 'typeorm';
import { AppDataSource } from '../data-source';
import { User, UserRole } from '../users/entities/user.entity';
import { Article } from '../articles/entities/article.entity';
import { Category } from '../categories/entities/category.entity';
import { Project, ProjectStatus } from '../projects/entities/project.entity';
import { Event, EventType } from '../events/entities/event.entity';
import { Profile, ProfileType } from '../profiles/entities/profile.entity';
import * as bcrypt from 'bcrypt';

async function seed() {
    await AppDataSource.initialize();
    console.log('DataSource initialized');

    const userRepository = AppDataSource.getRepository(User);
    const articleRepository = AppDataSource.getRepository(Article);
    const categoryRepository = AppDataSource.getRepository(Category);
    const projectRepository = AppDataSource.getRepository(Project);
    const eventRepository = AppDataSource.getRepository(Event);
    const profileRepository = AppDataSource.getRepository(Profile);

    // 1. Seed Admin User
    const adminEmail = 'admin@admin.com';
    const adminPassword = 'admin123';
    let admin = await userRepository.findOne({ where: { email: adminEmail } });

    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    if (!admin) {
        admin = userRepository.create({
            email: adminEmail,
            password: hashedPassword,
            role: UserRole.ADMIN,
        });
        console.log('Creating new admin user...');
    } else {
        admin.password = hashedPassword;
        console.log('Updating existing admin user password...');
    }
    await userRepository.save(admin);
    console.log(`Admin user seeded/updated: ${adminEmail} / ${adminPassword}`);

    // 2. Seed Categories
    const categoriesData = [
        { name: 'Research', slug: 'research' },
        { name: 'Policy', slug: 'policy' },
        { name: 'Technical', slug: 'technical' },
    ];

    for (const cat of categoriesData) {
        let category = await categoryRepository.findOne({ where: { slug: cat.slug } });
        if (!category) {
            category = categoryRepository.create(cat);
            await categoryRepository.save(category);
            console.log(`Seeded category: ${cat.name}`);
        }
    }

    const allCategories = await categoryRepository.find();
    const researchCat = allCategories.find((c) => c.slug === 'research');
    const technicalCat = allCategories.find((c) => c.slug === 'technical');

    // 3. Seed Articles
    const articlesData = [
        {
            title: 'Cybersecurity Trends 2026',
            slug: 'cybersecurity-trends-2026',
            content: '<p>Exploring the latest trends in artificial intelligence and cybersecurity...</p>',
            excerpt: 'The landscape of digital security is evolving rapidly...',
            imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b',
            date: 'Jan 15, 2026',
            featured: true,
            isPublished: true,
            categoryId: researchCat?.id,
        },
        {
            title: 'Protecting Critical Infrastructure',
            slug: 'protecting-critical-infrastructure',
            content: '<p>A deep dive into securing national power grids and water systems...</p>',
            excerpt: 'How governments are responding to increased cyber threats...',
            imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc4b',
            date: 'Dec 10, 2025',
            featured: false,
            isPublished: true,
            categoryId: technicalCat?.id,
        },
    ];

    for (const art of articlesData) {
        let article = await articleRepository.findOne({ where: { slug: art.slug } });
        if (!article) {
            article = articleRepository.create(art);
            await articleRepository.save(article);
            console.log(`Seeded article: ${art.title}`);
        }
    }

    // 4. Seed Projects
    const projectsData = [
        {
            title: 'Regional SOC Initiative',
            description: 'Building a collaborative Security Operations Center for East Africa.',
            imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3',
            status: ProjectStatus.ONGOING,
        },
        {
            title: 'African Cyber Academy',
            description: 'Specialized training programs for the next generation of security experts.',
            imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7',
            status: ProjectStatus.COMPLETED,
        },
    ];

    for (const proj of projectsData) {
        let project = await projectRepository.findOne({ where: { title: proj.title } });
        if (!project) {
            project = projectRepository.create(proj);
            await projectRepository.save(project);
            console.log(`Seeded project: ${proj.title}`);
        }
    }

    // 5. Seed Events
    const eventsData = [
        {
            title: 'ACC Tech Summit 2026',
            date: 'Oct 15, 2026',
            location: 'Nairobi, Kenya',
            type: EventType.IN_PERSON,
        },
        {
            title: 'Webinar: Identity Security',
            date: 'Mar 20, 2026',
            location: 'Online',
            type: EventType.ONLINE,
            registrationLink: 'https://zoom.us/j/123456',
        },
    ];

    for (const evt of eventsData) {
        let event = await eventRepository.findOne({ where: { title: evt.title } });
        if (!event) {
            event = eventRepository.create(evt);
            await eventRepository.save(event);
            console.log(`Seeded event: ${evt.title}`);
        }
    }

    // 6. Seed Profiles
    const profilesData = [
        {
            name: 'Amani Kweli',
            role: 'Executive Director',
            bio: 'Executive Director with over 15 years of experience in telecom security.',
            imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
            type: ProfileType.STAFF,
        },
        {
            name: 'Sarah Johnson',
            role: 'Technical Lead',
            bio: 'Lead Architect specializing in cloud security and compliance.',
            imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
            type: ProfileType.STAFF,
        },
    ];

    for (const prof of profilesData) {
        let profile = await profileRepository.findOne({ where: { name: prof.name } });
        if (!profile) {
            profile = profileRepository.create(prof);
            await profileRepository.save(profile);
            console.log(`Seeded profile: ${prof.name}`);
        }
    }

    await AppDataSource.destroy();
    console.log('Seeding complete');
}

seed().catch((err) => {
    console.error('Error during seeding:', err);
    process.exit(1);
});

