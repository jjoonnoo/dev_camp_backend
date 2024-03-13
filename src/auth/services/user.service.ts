import { AccessTokenRepository, UserRepository } from '../repositories';
import {
    BadRequestException,
    HttpException,
    Injectable,
    HttpStatus,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { User } from '../entities';
import { CreateUserDto } from '../dto';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly accessTokenRepository: AccessTokenRepository,
    ) {}
    async createUser(dto: CreateUserDto): Promise<User> {
        const user = await this.userRepository.findOneByEmail(dto.email);
        if (user) {
            throw new BadRequestException('this email already exists');
        }
        const hashedPassword = await argon2.hash(dto.password);
        return this.userRepository.createUser(dto, hashedPassword);
    }
    // async findById(sub)
    async validateUser(id: string, jti: string): Promise<User> {
        const [user, token] = await Promise.all([
            this.userRepository.findOneBy({ id }),
            this.accessTokenRepository.findOneByJti(jti),
        ]);
        if (!user) {
            throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
        }
        if (!token) {
            throw new HttpException(
                'this token is revoked',
                HttpStatus.BAD_REQUEST,
            );
        }
        return user;
    }
}
