import { Entity, ManyToOne, JoinColumn, PrimaryColumn, Column } from 'typeorm';
import { Users } from 'src/users/entities/user.entity';
import { Polls } from 'src/polls/entities/poll.entity';

@Entity()
export class Votes {
    @PrimaryColumn()
    user_id: number;

    @PrimaryColumn()
    poll_id: number;

    @PrimaryColumn({ length: 50 })
    answer: string;

    @Column()
    vote_date: Date;

    @ManyToOne(() => Users, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: Users;

    @ManyToOne(() => Polls, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id' })
    poll: Polls;
}
