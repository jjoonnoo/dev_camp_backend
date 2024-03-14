import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Order, OrderItem, Coupon, Product, Point } from '../entities';
import { User } from '../../auth/entities';
import { CreateOrderDto } from '../dto/create-order.dto';
import { ProductService } from './product.service';
import {
    IssuedCouponRepository,
    OrderRepository,
    PointRepository,
    ShippingInfoRepository,
} from '../repositories';
import { Transactional } from 'typeorm-transactional';
@Injectable()
export class PaymentService {
    constructor(
        private readonly issuedCouponRepository: IssuedCouponRepository,
        private readonly pointRepository: PointRepository,
        private readonly productService: ProductService,
        private readonly shippingInfoRepository: ShippingInfoRepository,
        private readonly orderRepository: OrderRepository,
    ) {}
    @Transactional()
    async createOrder(dto: CreateOrderDto): Promise<Order> {
            // 주문 금액 계산
        const totalAmount = await this.calculateTotalAmount(dto.orderItems);

        // 할인 적용
        const finalAmount = await this.applyDiscounts(
        totalAmount,
        dto.userId,
        dto.couponId,
        dto.pointAmount,
        );

        // 주문 생성
        return this.orderRepository.createOrder(
            dto.userId,
            dto.orderItems,
            finalAmount,
            dto.address,
        );
    }
    private async calculateTotalAmount(orderItems: OrderItem[]): Promise<number> {
        let totalAmount = 0;
    
        const productIds = orderItems.map((item) => item.productId);
        const products = await this.productService.getProductsByIds(productIds);
        for (const item of orderItems) {
          const product = products.find((p) => p.id === item.productId);
          if (!product) {
            throw new HttpException(
              `Product with ID ${item.productId} not found`,
              HttpStatus.BAD_REQUEST,
            );
          }
          totalAmount += product.price * item.quantity;
        }
    
        return totalAmount;
      }
    
      private async applyDiscounts(
        totalAmount: number,
        userId: string,
        couponId?: string,
        pointAmountToUse?: number,
      ): Promise<number> {
        const couponDiscount = couponId
          ? await this.applyCoupon(couponId, userId, totalAmount)
          : 0;
        const pointDiscount = pointAmountToUse
          ? await this.applyPoints(pointAmountToUse, userId)
          : 0;
    
        // 최종 금액 계산
        const finalAmount = totalAmount - (couponDiscount + pointDiscount);
        return finalAmount < 0 ? 0 : finalAmount;
      }
    
      private async applyCoupon(
        couponId: string,
        userId: string,
        totalAmount: number,
      ): Promise<number> {
        const issuedCoupon = await this.issuedCouponRepository.findOne({
          where: {
            coupon: { id: couponId },
            user: { id: userId },
          },
        });
    
        if (!issuedCoupon) {
          throw new HttpException(
            `user doesn't have coupon. couponId: ${couponId} userId: ${userId}`,
            HttpStatus.BAD_REQUEST,
          );
        }
    
        const isValid =
          issuedCoupon?.isValid &&
          issuedCoupon?.validFrom <= new Date() &&
          issuedCoupon?.validUntil > new Date();
        if (!isValid) {
          throw new HttpException(
            `Invalid coupon type. couponId: ${couponId} userId: ${userId}`,
            HttpStatus.BAD_REQUEST,
          );
        }
    
        const { coupon } = issuedCoupon;
        if (coupon.type === 'percent') {
          return (totalAmount * coupon.value) / 100;
        } else if (coupon.type === 'fixed') {
          return coupon.value;
        }
        return 0;
      }
    
      private async applyPoints(
        pointAmountToUse: number,
        userId: string,
      ): Promise<number> {
        const point = await this.pointRepository.findOne({
          where: { user: { id: userId } },
        });
        if (point.availableAmount < 0 || point.availableAmount < pointAmountToUse) {
          throw new HttpException(
            `Invalid points amount ${point.availableAmount}`,
            HttpStatus.BAD_REQUEST,
          );
        }
    
        return pointAmountToUse;
      }
}
