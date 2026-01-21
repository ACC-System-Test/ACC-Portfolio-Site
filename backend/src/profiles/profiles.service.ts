import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfilesService {
    constructor(
        @InjectRepository(Profile)
        private profilesRepository: Repository<Profile>,
    ) { }

    async create(data: any) {
        const profile = this.profilesRepository.create(data);
        return this.profilesRepository.save(profile);
    }

    async findAll() {
        return this.profilesRepository.find();
    }

    async findOne(id: string) {
        const profile = await this.profilesRepository.findOneBy({ id });
        if (!profile) throw new NotFoundException('Profile not found');
        return profile;
    }

    async update(id: string, data: any) {
        await this.profilesRepository.update(id, data);
        return this.findOne(id);
    }

    async remove(id: string) {
        const result = await this.profilesRepository.delete(id);
        if (result.affected === 0) throw new NotFoundException('Profile not found');
        return { deleted: true };
    }
}
