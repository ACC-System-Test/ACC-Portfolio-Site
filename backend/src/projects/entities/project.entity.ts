import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum ProjectStatus {
    ONGOING = 'Ongoing',
    COMPLETED = 'Completed',
    UPCOMING = 'Upcoming',
}

@Entity()
export class Project {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ nullable: true })
    imageUrl: string;

    @Column({
        type: 'enum',
        enum: ProjectStatus,
        default: ProjectStatus.ONGOING,
    })
    status: ProjectStatus;

    @Column({ nullable: true })
    link: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
