import { Entity, Column, ManyToOne, OneToMany,JoinColumn,OneToOne,Relation } from 'typeorm';
import { BaseEntity } from '../../common/entity';
import { User } from '../../auth/entities';
import { OrderItem,IssuedCoupon } from '../entities'

@Entity()
export class Order extends BaseEntity {
    @ManyToOne(() => User, (user) => user.order)
    user: User;
    @Column({ type: 'varchar' })
    orderNo: string;
    @Column()
    amount: number;
    @OneToMany(() => OrderItem, (item) => item.order)
    items: Relation<OrderItem[]>;
    @Column({ type: 'int', default: 0 })
    pointAmountUsed: number;
    @OneToOne(() => IssuedCoupon, (issuedCoupon) => issuedCoupon.usedOrder, {
        nullable: true,
    })
    @JoinColumn()
    usedIssuedCoupon: Relation<IssuedCoupon>;
}
