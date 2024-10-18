import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePollDto } from './dto/create-poll.dto';
// import { UpdatePollDto } from './dto/update-poll.dto';
import { Polls } from './entities/poll.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswerOptions } from './../answers/entities/answer.entity';
import { PollDto } from './dto/response-poll.dto';
import { UuidService } from 'nestjs-uuid';
import { UpdatePollDto } from './dto/update-poll.dto';

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

    async update(pollId: string, updatePollDto: UpdatePollDto): Promise<void> {
        const poll = await this.pollRepository.findOne({
            where: { poll_id: pollId },
        });

        if (!poll) {
            throw new NotFoundException(`Poll with ID ${pollId} not found`);
        }

        if (updatePollDto.title) poll.title = updatePollDto.title;
        if (updatePollDto.description) poll.description = updatePollDto.description;
        if (updatePollDto.answerOptions) {
            await this.updateAnswerOptions(poll.poll_id, updatePollDto.answerOptions);
        }
        await this.pollRepository.save(poll);
    }

    private async updateAnswerOptions(pollId: string, newOptions: string[]): Promise<void> {
        const existingOptions = await this.answerRepository.find({
            where: { poll_id: pollId },
        });
        const optionsToDelete = existingOptions.filter(
            (option) => !newOptions.includes(option.answer)
        );
        if (optionsToDelete.length > 0) {
            await this.answerRepository.remove(optionsToDelete);
        }

        const optionsToUpsert = newOptions.map(async (optionText) => {
            let option = existingOptions.find((opt) => opt.answer === optionText);

            if (!option) {
                option = this.answerRepository.create({
                    poll_id: pollId,
                    answer: optionText,
                });
            } else {
                option.answer = optionText;
            }

            return this.answerRepository.save(option);
        });

        await Promise.all(optionsToUpsert);
    }

    async deletePoll(pollId: string): Promise<void> {
        await this.answerRepository.delete({ poll_id: pollId });
        await this.pollRepository.delete(pollId);
    }
}
