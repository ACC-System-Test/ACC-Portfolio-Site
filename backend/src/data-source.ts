import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from './users/entities/user.entity';
import { Resource } from './resources/entities/resource.entity';
import { Article } from './articles/entities/article.entity';
import { Category } from './categories/entities/category.entity';
import { Project } from './projects/entities/project.entity';
import { Event } from './events/entities/event.entity';
import { Profile } from './profiles/entities/profile.entity';

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User, Resource, Article, Category, Project, Event, Profile],
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
    synchronize: false,
});
