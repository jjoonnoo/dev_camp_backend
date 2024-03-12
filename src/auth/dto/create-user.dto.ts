import { IsString, IsEmail } from 'class-validator';
import { UserRole } from '../entities';
export class CreateUserDto {
    @IsString()
    name: string;
    @IsEmail()
    email: string;
    @IsString()
    password: string;
    @IsString()
    phone: string;
    @IsString()
    role: UserRole;
}
