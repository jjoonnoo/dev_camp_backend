import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    Relation,
} from 'typeorm';
import { BaseEntity } from '../../common/entity';
import { Coupon } from './coupon.entity';
import { Order } from './order.entity';
import { User } from '../../auth/entities';
@Entity()
export class IssuedCoupon extends BaseEntity {
    @ManyToOne(() => User)
    @JoinColumn()
    user: Relation<User>;
    @ManyToOne(() => Coupon)
    @JoinColumn()
    coupon: Relation<Coupon>;
    @Column({ type: 'boolean', default: false })
    isValid: boolean;
    @Column({ type: 'boolean', default: false })
    isUsed: boolean;
    @Column({ type: 'timestamp' })
    usedAt: Date;
    @OneToOne(() => Order, (order) => order.usedIssuedCoupon, {
        nullable: true,
    })
    usedOrder: Relation<Order>;
}
