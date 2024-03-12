import { IsUUID, IsDate } from 'class-validator';
export class IssueCouponReqDto {
    @IsUUID()
    userId: string;
    @IsUUID()
    couponId: string;
    @IsDate()
    expireDate: Date;
}
