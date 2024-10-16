import { IsDate, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreatePollDto {
    @IsString()
    @MinLength(2, { message: 'Title is too short' })
    @IsNotEmpty()
    title: string;

    @IsString()
    @MinLength(2, { message: 'Description is too short' })
    description?: string;

    beginning_date?: Date;

    end_date?: Date;

    mult_choice: boolean;

    @IsNotEmpty()
    answer_options: string[];
}
