import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project)
        private projectsRepository: Repository<Project>,
    ) { }

    async create(data: any) {
        const project = this.projectsRepository.create(data);
        return this.projectsRepository.save(project);
    }

    async findAll() {
        return this.projectsRepository.find();
    }

    async findOne(id: string) {
        const project = await this.projectsRepository.findOneBy({ id });
        if (!project) throw new NotFoundException('Project not found');
        return project;
    }

    async update(id: string, data: any) {
        await this.projectsRepository.update(id, data);
        return this.findOne(id);
    }

    async remove(id: string) {
        const result = await this.projectsRepository.delete(id);
        if (result.affected === 0) throw new NotFoundException('Project not found');
        return { deleted: true };
    }
}
