import { Column, Entity, OneToMany, Relation } from 'typeorm';
import { BaseEntity } from '../../common/entity';
import { IssuedCoupon } from './issued-coupon.entity';

@Entity()
export class Coupon extends BaseEntity {
    @Column({ type: 'varchar' })
    type: 'percentage' | 'fixed';
    @Column()
    quantity: number;
    @Column({ type: 'timestamp' })
    expireDate: Date;
    @OneToMany(() => IssuedCoupon, (issuedCoupon) => issuedCoupon.coupon)
    issuedCoupons: Relation<IssuedCoupon[]>;
}
