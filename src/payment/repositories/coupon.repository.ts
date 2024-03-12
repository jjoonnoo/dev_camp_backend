import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { Coupon } from '../entities';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { CreateCouponDto } from '../dto';

@Injectable()
export class CouponRepository extends Repository<Coupon> {
    constructor(
        @InjectRepository(Coupon)
        private readonly repository: Repository<Coupon>,
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) {
        super(repository.target, repository.manager, repository.queryRunner);
    }
    async createCoupon(dto: CreateCouponDto): Promise<Coupon> {
        const { type, quantity, expireDate } = dto;
        const coupon = new Coupon();
        coupon.type = type;
        coupon.quantity = quantity;
        coupon.expireDate = expireDate;
        return this.repository.save(coupon);
    }
}
