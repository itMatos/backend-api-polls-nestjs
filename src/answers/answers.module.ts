import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerOptions } from './entities/answer.entity';

@Module({
    imports: [TypeOrmModule.forFeature([AnswerOptions])],
    controllers: [AnswersController],
    providers: [AnswersService],
})
export class AnswersModule {}
