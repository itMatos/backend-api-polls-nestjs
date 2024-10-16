import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Polls {
    @PrimaryColumn({ type: 'int', name: 'poll_id' })
    poll_id: string;

    @Column({ type: 'varchar', length: 50 })
    title: string;

    @Column({ type: 'varchar', length: 100 })
    description: string;

    @Column({ type: 'date' })
    beginning_date: Date;

    @Column({ type: 'date', nullable: true })
    end_date: Date;

    @Column({ type: 'boolean', default: false })
    mult_choice: boolean;
}
