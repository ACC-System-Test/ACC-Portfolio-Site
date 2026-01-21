import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Resource } from './entities/resource.entity';

@Injectable()
export class ResourcesService {
  constructor(
    @InjectRepository(Resource)
    private resourceRepository: Repository<Resource>,
  ) { }

  create(createResourceDto: CreateResourceDto) {
    const resource = this.resourceRepository.create(createResourceDto);
    return this.resourceRepository.save(resource);
  }

  async findAll(options: { page: number; limit: number; search?: string; type?: string }) {
    const { page, limit, search, type } = options;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (type) {
      where.type = type;
    }

    if (search) {
      where.title = Like(`%${search}%`);
      // Note: OR condition with type is tricky in partial objects, simplified for now:
      // If we need search AND type, we need TypeORM's Advanced FindOptions
    }

    // Better TypeORM query builder or find options structure for Search + Type:
    const findOptions: any = {
      where: search ? [
        { title: Like(`%${search}%`), ...(type && { type }) },
        { content: Like(`%${search}%`), ...(type && { type }) }
      ] : (type ? { type } : {}),
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    };

    const [data, total] = await this.resourceRepository.findAndCount(findOptions);

    return {
      data,
      meta: {
        total,
        page: +page,
        limit: +limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const resource = await this.resourceRepository.findOneBy({ id });
    if (!resource) throw new NotFoundException('Resource not found');
    return resource;
  }

  async update(id: string, updateResourceDto: UpdateResourceDto) {
    await this.resourceRepository.update(id, updateResourceDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const result = await this.resourceRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Resource not found');
    return { deleted: true };
  }
}
