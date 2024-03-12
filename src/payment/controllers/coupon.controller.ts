import { Body, Controller, Post, Req } from '@nestjs/common';
import { CouponService } from '../services';
import { CreateCouponDto } from '../dto';
@Controller('coupon')
export class CouponController {
    constructor(private readonly couponService: CouponService) {}
    @Post()
    async createCoupon(@Body() createCouponDto: CreateCouponDto) {
        return this.couponService.createCoupon(createCouponDto);
    }
    // @Post()
    // async issueCoupon(@Body() )
    //특정 유저에게 어떤 쿠폰을
}
