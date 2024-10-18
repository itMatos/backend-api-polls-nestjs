import { Polls } from 'src/polls/entities/poll.entity';
import { Entity, ManyToOne, PrimaryColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class AnswerOptions {
    @PrimaryColumn({ type: 'int', name: 'poll_id' })
    poll_id: string;

    @PrimaryColumn()
    answer: string;
}
