import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';

@Entity()
export class Article {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({ unique: true })
    slug: string;

    @Column({ type: 'text' })
    content: string;

    @Column({ type: 'text', nullable: true })
    excerpt: string;

    @Column({ nullable: true })
    imageUrl: string;

    @Column({ nullable: true })
    date: string;

    @Column({ default: false })
    featured: boolean;

    @Column({ default: false })
    isPublished: boolean;

    @ManyToOne(() => Category, (category) => category.articles)
    category: Category;

    @Column({ nullable: true })
    categoryId: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
