import { UserRepository } from '../repositories';
import { BadRequestException, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { User } from '../entities';
import { CreateUserDto } from '../dto';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository : UserRepository,
    ){}
    async createUser(dto: CreateUserDto): Promise<User>{
        const user = await this.userRepository.findOneByEmail(dto.email);
        if (user){
            throw new BadRequestException('this email already exists');
        }
        const hashedPassword = await argon2.hash(dto.password)
        return this.userRepository.createUser(dto, hashedPassword)
    }
}