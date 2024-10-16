import { Injectable } from '@nestjs/common';
import { UuidService } from 'nestjs-uuid';

@Injectable()
export class AppService {
    constructor(private readonly uuidService: UuidService) {}

    getHello(): string {
        // return this.uuidService.generate();
        return 'Hello World!';
    }
}
