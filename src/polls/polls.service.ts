import { Injectable } from '@nestjs/common';
import { CreatePollDto } from './dto/create-poll.dto';
// import { UpdatePollDto } from './dto/update-poll.dto';
import { Polls } from './entities/poll.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswerOptions } from './../answers/entities/answer.entity';
import { PollDto } from './dto/response-poll.dto';
import { UuidService } from 'nestjs-uuid';

@Injectable()
export class PollsService {
    constructor(
        @InjectRepository(Polls)
        private readonly pollRepository: Repository<Polls>,

        @InjectRepository(AnswerOptions)
        private readonly answerRepository: Repository<AnswerOptions>,

        private readonly uuidService: UuidService
    ) {}

    async createPoll(createPollDto: CreatePollDto): Promise<PollDto> {
        const poll = new Polls();
        const uuid = this.uuidService.generate();
        const { title, description, end_date, mult_choice } = createPollDto;
        poll.poll_id = uuid;
        poll.title = title;
        poll.description = description;
        poll.beginning_date = new Date();
        poll.end_date = end_date ? new Date(end_date) : null;
        poll.mult_choice = mult_choice;

        await this.pollRepository.save(poll);

        const answerOptions = await Promise.all(
            (createPollDto.answer_options ?? []).map((answer) =>
                this.answerRepository.save({ poll_id: uuid, answer })
            )
        ).then((answers) => answers.map((answer) => answer.answer));

        const response: PollDto = { ...poll, answerOptions };
        return response;
    }

    async findAllPolls(): Promise<PollDto[]> {
        const polls = await this.pollRepository.find();
        const pollsWithAnswerOptions = await Promise.all(
            polls.map(async (poll) => {
                const answerOptions = await this.answerRepository
                    .find({
                        where: { poll_id: poll.poll_id },
                    })
                    .then((answers) => answers.map((answer) => answer.answer));
                return { ...poll, answerOptions };
            })
        );
        return pollsWithAnswerOptions;
    }

    async findOnePollWithOptions(id: string): Promise<PollDto> {
        const poll = await this.pollRepository.findOneBy({ poll_id: id });
        const answerOptions = await this.answerRepository
            .find({ where: { poll_id: id } })
            .then((answers) => answers.map((answer) => answer.answer));
        const response = { ...poll, answerOptions };
        return response;
    }

    // update(id: number, updatePollDto: UpdatePollDto) {}

    async deletePoll(pollId: string): Promise<void> {
        await this.answerRepository.delete({ poll_id: pollId });
        this.pollRepository.delete(pollId);
    }
}
