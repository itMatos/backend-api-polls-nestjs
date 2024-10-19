import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Votes {
    @PrimaryColumn()
    user_id: string;

    @PrimaryColumn()
    poll_id: string;

    @PrimaryColumn({ length: 50 })
    answer: string;

    @Column()
    vote_date: Date;
}
