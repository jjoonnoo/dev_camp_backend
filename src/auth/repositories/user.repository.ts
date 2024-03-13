import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities';
import { CreateUserDto } from '../dto';

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>,
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) {
        super(repository.target, repository.manager, repository.queryRunner);
    }
    async findOneByEmail(email: string): Promise<User> {
        return this.repository.findOneBy({ email });
    }
    async createUser(
        dto: CreateUserDto,
        hashedPassword: string,
    ): Promise<User> {
        const user = new User();
        user.email = dto.email;
        user.name = dto.name;
        user.password = hashedPassword;
        user.phone = dto.phone;
        user.role = dto.role;
        return this.repository.save(user);
    }
}
