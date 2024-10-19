import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { VotesService } from './votes.service';
import { CreateVoteDto } from './dto/create-vote.dto';
// import { UpdateVoteDto } from './dto/update-vote.dto';

@Controller('votes')
export class VotesController {
    constructor(private readonly votesService: VotesService) {}

    @Post()
    create(@Body() createVoteDto: CreateVoteDto) {
        return this.votesService.create(createVoteDto);
    }

    @Get()
    findAll() {
        return this.votesService.findAll();
    }

    @Get('poll/:poll_id')
    findVotesByPoll(@Param('poll_id') poll_id: string) {
        return this.votesService.findVotesByPoll(poll_id);
    }

    @Get('/user-voted-polls/:userId')
    async getUserVotedPolls(@Param('userId') userId: string): Promise<object[]> {
        return this.votesService.getUserVotedPolls(userId);
    }

    @Delete(':user_id/:poll_id')
    remove(@Param('user_id') user_id: string, @Param('poll_id') poll_id: string) {
        return this.votesService.remove(user_id, poll_id);
    }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateVoteDto: UpdateVoteDto) {
    //     return this.votesService.update(+id, updateVoteDto);
    // }
}
