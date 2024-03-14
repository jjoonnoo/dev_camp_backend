import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { CouponRepository, IssueCouponRepository } from '../repositories';
import { UserRepository } from '../../auth/repositories';
import { User } from '../../auth/entities';
import { Coupon, IssuedCoupon } from '../entities';
import { CreateCouponDto } from '../dto';
@Injectable()
export class CouponService {
    constructor(
        private readonly couponRepository: CouponRepository,
        private readonly userRepository: UserRepository,
        private readonly issueCouponRepository: IssueCouponRepository,
    ) {}
    async createCoupon(
        user: User,
        createCouponDto: CreateCouponDto,
    ): Promise<Coupon> {
        if (user.role !== 'admin') {
            throw new HttpException('You are not admin', HttpStatus.FORBIDDEN);
        }
        return await this.couponRepository.createCoupon(createCouponDto);
    }
    async issueCoupon(user: User, coupon: Coupon): Promise<IssuedCoupon> {
        return await this.issueCouponRepository.issueCouponToUser(user, coupon);
    }
    async getCoupons(user: User) {
        return await this.issueCouponRepository.getCoupons(user);
    }
}
