import { IsString, IsNumber, } from 'class-validator';
export class TokenPayloadDto {
    @IsString()
    sub: string;
    @IsNumber()
    iat: number;
    @IsString()
    jti: string;
};