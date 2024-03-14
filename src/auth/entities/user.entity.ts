import { Column, Entity, OneToOne, OneToMany, Relation } from 'typeorm';
import { BaseEntity } from '../../common/entity';
import { Point, Order } from '../../payment/entities';
export type UserRole = 'admin' | 'user';
@Entity()
export class User extends BaseEntity {
    @Column({ type: 'varchar' })
    email: string;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar' })
    password: string;

    @Column({ type: 'varchar' })
    phone: string;

    @Column({ type: 'varchar' })
    role: string;

    @OneToOne(() => Point, (point) => point.user)
    point: Relation<Point>;
    @OneToMany(() => Order, (order) => order.user)
    order: Relation<Order[]>;
}
