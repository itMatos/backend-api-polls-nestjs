import { Injectable } from '@nestjs/common';
import { CreateVoteDto } from './dto/create-vote.dto';
// import { UpdateVoteDto } from './dto/update-vote.dto';
import { Votes } from './entities/vote.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class VotesService {
    constructor(
        @InjectRepository(Votes)
        private readonly voteRepository: Repository<Votes>
    ) {}
    create(createVoteDto: CreateVoteDto): Promise<Votes> {
        const vote = new Votes();
        vote.poll_id = createVoteDto.poll_id;
        vote.user_id = createVoteDto.user_id;
        vote.answer = createVoteDto.answer;
        vote.vote_date = new Date();
        return this.voteRepository.save(vote);
    }

    findAll(): Promise<Votes[]> {
        return this.voteRepository.find();
    }

    findVotesByPoll(poll_id: string): Promise<Votes[]> {
        return this.voteRepository.find({
            where: { poll_id },
        });
    }

    async getUserVotedPolls(userId: string): Promise<{ poll_id: string; answer: string }[]> {
        const votes = await this.voteRepository.find({ where: { user_id: userId } });
        return votes.map((vote) => ({ poll_id: vote.poll_id, answer: vote.answer }));
    }

    // update(id: number, updateVoteDto: UpdateVoteDto) {
    //     return `This action updates a #${id} vote`;
    // }

    async remove(user_id: string, poll_id: string): Promise<void> {
        await this.voteRepository.delete({ user_id, poll_id });
    }
}
