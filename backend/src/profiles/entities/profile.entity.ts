import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum ProfileType {
    STAFF = 'Staff',
    BOARD = 'Board',
    VOLUNTEER = 'Volunteer',
    INTERN = 'Intern',
}

@Entity()
export class Profile {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    role: string;

    @Column({ type: 'text' })
    bio: string;

    @Column({ nullable: true })
    imageUrl: string;

    @Column({
        type: 'enum',
        enum: ProfileType,
        default: ProfileType.STAFF,
    })
    type: ProfileType;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
