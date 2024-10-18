import { PartialType } from '@nestjs/mapped-types';
import { CreatePollDto } from './create-poll.dto';

export class UpdatePollDto extends PartialType(CreatePollDto) {
    title: string;

    description?: string;

    beginning_date?: Date;

    end_date?: Date;

    answerOptions?: string[];
}
