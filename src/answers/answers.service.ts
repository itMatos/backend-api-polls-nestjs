import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { AnswerOptions } from './entities/answer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AnswersService {
    constructor(
        @InjectRepository(AnswerOptions)
        private readonly answerRepository: Repository<AnswerOptions>
    ) {}

    create(createAnswerDto: CreateAnswerDto) {
        return this.answerRepository.save(createAnswerDto);
    }

    findAll(): Promise<AnswerOptions[]> {
        return this.answerRepository.find();
    }

    findAllPoll(pollId: string): Promise<AnswerOptions[]> {
        return this.answerRepository.find({ where: { poll_id: pollId } });
    }

    update(id: number, updateAnswerDto: UpdateAnswerDto) {
        return `This action updates a #${id} answer`;
    }

    remove(id: number) {
        return `This action removes a #${id} answer`;
    }
}
