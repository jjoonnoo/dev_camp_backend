import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { IssuedCoupon, Coupon } from '../entities';
import { User } from '../../auth/entities';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class IssueCouponRepository extends Repository<IssuedCoupon> {
    constructor(
        @InjectRepository(IssuedCoupon)
        private readonly repository: Repository<IssuedCoupon>,
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) {
        super(repository.target, repository.manager, repository.queryRunner);
    }
    async issueCouponToUser(user: User, coupon: Coupon): Promise<IssuedCoupon> {
        const issuedCoupon = new IssuedCoupon();
        issuedCoupon.user = user;
        issuedCoupon.coupon = coupon;
        issuedCoupon.isValid = true;
        issuedCoupon.isUsed = false;
        return this.repository.save(issuedCoupon);
    }
}
