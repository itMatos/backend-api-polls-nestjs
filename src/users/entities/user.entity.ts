import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Users {
    @PrimaryColumn()
    user_id: string;

    @Column({ type: 'varchar', length: 60 })
    name: string;

    @Column({ type: 'varchar', length: 50 })
    email: string;
}
