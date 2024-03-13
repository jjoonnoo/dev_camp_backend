import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CreateOrderDto } from '../dto'
import { JwtAuthGuard } from '../../auth/securities/guards';
@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}
    @Post('order')
    @UseGuards(JwtAuthGuard)
    async createOrder(@Body() createOrderDto: CreateOrderDto) {
        return await this.paymentService(createOrderDto)
    }
}
