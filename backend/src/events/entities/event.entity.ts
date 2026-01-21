import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum EventType {
    ONLINE = 'Online',
    IN_PERSON = 'In-Person',
}

@Entity()
export class Event {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    date: string;

    @Column()
    location: string;

    @Column({
        type: 'enum',
        enum: EventType,
        default: EventType.IN_PERSON,
    })
    type: EventType;

    @Column({ nullable: true })
    registrationLink: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
