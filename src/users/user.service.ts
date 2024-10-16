import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UuidService } from 'nestjs-uuid';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>,

        private readonly uuidService: UuidService
    ) {}

    createUser(createUserDto: CreateUserDto): Promise<Users> {
        const user = new Users();
        user.id = this.uuidService.generate();
        user.name = createUserDto.name;
        user.email = createUserDto.email;
        return this.userRepository.save(user);
    }

    findAllUsers(): Promise<Users[]> {
        return this.userRepository.find();
    }

    viewUser(id: string): Promise<Users> {
        return this.userRepository.findOneBy({ id });
    }

    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<Users> {
        const user: Users = new Users();
        user.id = id;
        user.name = updateUserDto.name;
        user.email = updateUserDto.email;

        return this.userRepository.save(user);
    }

    remove(id: number): Promise<{ affected?: number }> {
        return this.userRepository.delete(id);
    }
}
