import { Entity, ManyToOne, PrimaryColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class AnswerOptions {
    @PrimaryColumn({ type: 'int', name: 'poll_id' })
    poll_id: string;

    @PrimaryColumn()
    answer: string;

    @OneToMany(() => AnswerOptions, (answerOption) => answerOption.poll_id, { cascade: true })
    answerOptions: AnswerOptions[];
}
