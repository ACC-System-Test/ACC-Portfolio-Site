import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UploadsService {
    private readonly uploadPath = path.join(process.cwd(), 'uploads');

    constructor() {
        if (!fs.existsSync(this.uploadPath)) {
            fs.mkdirSync(this.uploadPath, { recursive: true });
        }
    }

    saveFile(file: Express.Multer.File): string {
        return `/uploads/${file.filename}`;
    }
}
