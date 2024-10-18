import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class AnswerOptions {
    @PrimaryColumn({ type: 'int', name: 'poll_id' })
    poll_id: string;

    @PrimaryColumn()
    answer: string;
}
