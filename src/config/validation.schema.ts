import {IsString,IsNumber} from 'class-validator'

export class ConfigValidatoinDto {
    @IsNumber()
    PORT: number;
    @IsString()
    JWT_SECRET:string;
    @IsString()
    ACCESS_TOKEN_EXPIRY: string;
    @IsString()
    REFRESH_TOKEN_EXPIRY: string;
    @IsString()
    DB_HOST: string;
    @IsNumber()
    DB_PORT: number;
    @IsString()
    DB_USERNAME: string;
    @IsString()
    DB_PASSWORD: string;
    @IsString()
    DB_DATABASE: string;
}
