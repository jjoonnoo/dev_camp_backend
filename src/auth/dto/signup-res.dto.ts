import { IsString, IsEmail } from 'class-validator';
export class SignupResDto  {
    @IsString()
    id: string;
    @IsString()
    name: string;
    @IsEmail()
    email: string;
    @IsString()
    phone: string;
}