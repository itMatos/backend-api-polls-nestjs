import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Controller('answers')
export class AnswersController {
    constructor(private readonly answersService: AnswersService) {}

    @Post()
    create(@Body() createAnswerDto: CreateAnswerDto) {
        return this.answersService.create(createAnswerDto);
    }

    @Get()
    findAll() {
        return this.answersService.findAll();
    }

    @Get()
    findAllById(@Param('poll_id') pollId: string) {
        return this.answersService.findAllPoll(pollId);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateAnswerDto: UpdateAnswerDto) {
        return this.answersService.update(+id, updateAnswerDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.answersService.remove(+id);
    }
}
