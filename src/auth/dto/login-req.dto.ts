import { IsString, IsEmail } from 'class-validator';
export class LoginReqDto  {
    @IsEmail()
    email: string;
    @IsString()
    password: string;
  };
  