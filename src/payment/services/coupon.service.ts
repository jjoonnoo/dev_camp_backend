import { Injectable } from '@nestjs/common';
import { CouponRepository } from '../repositories';
import { Coupon } from '../entities';
import { CreateCouponDto } from '../dto';
@Injectable()
export class CouponService {
    constructor(private readonly couponRepository: CouponRepository) {}
    async createCoupon(createCouponDto: CreateCouponDto): Promise<Coupon> {
        return await this.couponRepository.createCoupon(createCouponDto);
    }
}
