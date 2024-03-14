import { IsString, IsNumber } from 'class-validator';
import { OrderItem } from '../entities';
export class CreateOrderDto {
    @IsString()
    userId:string;
    orderItems: OrderItem[];
    @IsString()
    couponId?: string;
    @IsNumber()
    pointAmount?: number;
    @IsString()
    address: string;
}
