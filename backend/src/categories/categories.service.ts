import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private categoriesRepository: Repository<Category>,
    ) { }

    async create(data: any) {
        const category = this.categoriesRepository.create(data);
        return this.categoriesRepository.save(category);
    }

    async findAll() {
        return this.categoriesRepository.find();
    }

    async findOneBySlug(slug: string) {
        return this.categoriesRepository.findOneBy({ slug });
    }

    async remove(id: string) {
        await this.categoriesRepository.delete(id);
        return { deleted: true };
    }
}
