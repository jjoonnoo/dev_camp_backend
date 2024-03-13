import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entity';
export type UserRole = 'admin' | 'user';
@Entity()
export class User extends BaseEntity {
    @Column({ type: 'varchar' })
    email: string;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar' })
    password: string;

    @Column({ type: 'varchar' })
    phone: string;

    @Column({ type: 'varchar' })
    role: string;

    @Column({ type: 'int', default: 0 })
    point: number;
}
