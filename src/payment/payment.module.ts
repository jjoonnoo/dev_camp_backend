import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouponRepository } from './repositories';
import { Coupon, IssuedCoupon } from './entities';
import { AuthModule } from '../auth/auth.module';
import { CouponController } from './controllers/coupon.controller';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([Coupon, IssuedCoupon])],
    controllers: [CouponController],
    providers: [CouponRepository],
})
export class PaymentModule {}
