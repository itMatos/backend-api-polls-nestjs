import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>
    ) {}

    createUser(createUserDto: CreateUserDto): Promise<Users> {
        const user = new Users();
        user.name = createUserDto.name;
        user.email = createUserDto.email;
        return this.userRepository.save(user);
    }

    findAllUsers(): Promise<Users[]> {
        return this.userRepository.find();
    }

    viewUser(id: number): Promise<Users> {
        return this.userRepository.findOneBy({ id });
    }

    updateUser(id: number, updateUserDto: UpdateUserDto): Promise<Users> {
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
