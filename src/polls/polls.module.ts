import { Module } from '@nestjs/common';
import { PollsService } from './polls.service';
import { PollsController } from './polls.controller';
import { Polls } from './entities/poll.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerOptions } from 'src/answers/entities/answer.entity';
import { AnswersController } from 'src/answers/answers.controller';
import { AnswersService } from 'src/answers/answers.service';
import { UuidModule } from 'nestjs-uuid';

@Module({
    imports: [
        TypeOrmModule.forFeature([Polls]),
        TypeOrmModule.forFeature([AnswerOptions]),
        UuidModule,
    ],
    controllers: [PollsController, AnswersController],
    providers: [PollsService, AnswersService],
})
export class PollsModule {}
