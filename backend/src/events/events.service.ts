import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';

@Injectable()
export class EventsService {
    constructor(
        @InjectRepository(Event)
        private eventsRepository: Repository<Event>,
    ) { }

    async create(data: any) {
        const event = this.eventsRepository.create(data);
        return this.eventsRepository.save(event);
    }

    async findAll() {
        return this.eventsRepository.find();
    }

    async findOne(id: string) {
        const event = await this.eventsRepository.findOneBy({ id });
        if (!event) throw new NotFoundException('Event not found');
        return event;
    }

    async update(id: string, data: any) {
        await this.eventsRepository.update(id, data);
        return this.findOne(id);
    }

    async remove(id: string) {
        const result = await this.eventsRepository.delete(id);
        if (result.affected === 0) throw new NotFoundException('Event not found');
        return { deleted: true };
    }
}
