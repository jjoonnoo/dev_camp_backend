import { IsIn, IsNumber, IsDate } from 'class-validator';
export class CreateCouponDto {
    @IsIn(['fixed', 'percentage'])
    type: 'fixed' | 'percentage';
    @IsNumber()
    quantity: number;
    @IsDate()
    expireDate: Date;
}
