import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticlesService {
    constructor(
        @InjectRepository(Article)
        private articlesRepository: Repository<Article>,
    ) { }

    async create(data: any) {
        const article = this.articlesRepository.create(data);
        return this.articlesRepository.save(article);
    }

    async findAll() {
        return this.articlesRepository.find({
            relations: ['category'],
            order: { createdAt: 'DESC' },
        });
    }

    async findOne(id: string) {
        const article = await this.articlesRepository.findOne({
            where: { id },
            relations: ['category'],
        });
        if (!article) throw new NotFoundException('Article not found');
        return article;
    }

    async update(id: string, data: any) {
        await this.articlesRepository.update(id, data);
        return this.findOne(id);
    }

    async remove(id: string) {
        const result = await this.articlesRepository.delete(id);
        if (result.affected === 0) throw new NotFoundException('Article not found');
        return { deleted: true };
    }
}
