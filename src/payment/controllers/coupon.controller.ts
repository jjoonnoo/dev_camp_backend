import { Get, Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CouponService } from '../services';
import { CreateCouponDto } from '../dto';
import { Coupon } from '../entities';
import { JwtAuthGuard } from '../../auth/securities/guards';
@Controller('coupon')
export class CouponController {
    constructor(private readonly couponService: CouponService) {}
    @Post('create-coupon')
    @UseGuards(JwtAuthGuard)
    async createCoupon(@Req() req, @Body() createCouponDto: CreateCouponDto) {
        const user = req.user;
        return this.couponService.createCoupon(user, createCouponDto);
    }
    @Post('issue-coupon')
    @UseGuards(JwtAuthGuard)
    async issueCoupon(@Req() req, @Body() coupon: Coupon) {
        return this.couponService.issueCoupon(req.user, coupon);
    }
    @Get('get-coupons')
    @UseGuards(JwtAuthGuard)
    async getCoupons(@Req() req) {
        const user = req.user;
        return this.couponService.getCoupons(user);
    }
}
