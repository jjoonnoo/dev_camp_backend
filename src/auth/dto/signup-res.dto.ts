import { IsString, IsEmail, IsNumber } from 'class-validator';
export class SignupResDto  {
    @IsNumber()
    id: number;
    @IsString()
    name: string;
    @IsEmail()
    email: string;
    @IsString()
    phone: string;
}