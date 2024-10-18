export class PollDto {
    poll_id: string;
    title: string;
    description: string;
    beginning_date: Date;
    end_date?: Date;
    mult_choice: boolean;
    answerOptions: string[];
}
