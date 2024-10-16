import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { UuidModule } from 'nestjs-uuid';

@Module({
    imports: [TypeOrmModule.forFeature([Users]), UuidModule],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
