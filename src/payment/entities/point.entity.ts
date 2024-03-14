import { Entity, Column, OneToOne, JoinColumn, Relation } from 'typeorm';
import { User } from '../../auth/entities';
import { BaseEntity } from '../../common/entity';

@Entity()
export class Point extends BaseEntity {
    @OneToOne(() => User, (user) => user.point)
    @JoinColumn()
    user: Relation<User>;

    @Column({ type: 'int' })
    amount: number;
}
