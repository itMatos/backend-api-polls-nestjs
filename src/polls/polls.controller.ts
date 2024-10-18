import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { PollsService } from './polls.service';
import { CreatePollDto } from './dto/create-poll.dto';
import { UpdatePollDto } from './dto/update-poll.dto';
// import { UpdatePollDto } from './dto/update-poll.dto';

@Controller('polls')
export class PollsController {
    constructor(private readonly pollsService: PollsService) {}

    @Post()
    createPoll(@Body() createPollDto: CreatePollDto) {
        return this.pollsService.createPoll(createPollDto);
    }

    @Get()
    findAll(): Promise<object> {
        return this.pollsService.findAllPolls();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.pollsService.findOnePollWithOptions(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePollDto: UpdatePollDto) {
        return this.pollsService.update(id, updatePollDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.pollsService.deletePoll(id);
    }
}
