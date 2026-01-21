import { IsString, IsNotEmpty, IsBoolean, IsOptional, IsEnum } from 'class-validator';
import { ResourceType } from '../entities/resource.entity';

export class CreateResourceDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    slug: string;

    @IsEnum(ResourceType)
    @IsNotEmpty()
    type: ResourceType;

    @IsString()
    @IsOptional()
    content?: string;

    @IsString()
    @IsOptional()
    imageUrl?: string;

    @IsOptional()
    metadata?: any;

    @IsBoolean()
    @IsOptional()
    isPublished?: boolean;
}
