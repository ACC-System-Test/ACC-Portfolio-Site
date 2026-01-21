import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum ResourceType {
    ARTICLE = 'ARTICLE',
    PROJECT = 'PROJECT',
    EVENT = 'EVENT',
    PROFILE = 'PROFILE',
    SECTION = 'SECTION',
    OTHER = 'OTHER',
}

@Entity()
export class Resource {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({ unique: true })
    slug: string;

    @Column({
        type: 'enum',
        enum: ResourceType,
        default: ResourceType.OTHER,
    })
    type: ResourceType;

    @Column({ type: 'text', nullable: true })
    content: string;

    @Column({ nullable: true })
    imageUrl: string;

    @Column({ type: 'jsonb', nullable: true })
    metadata: any;

    @Column({ default: false })
    isPublished: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
