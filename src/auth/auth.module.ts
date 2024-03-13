import { Module, ValidationPipe } from '@nestjs/common';
import { AccessToken, RefreshToken, User } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
    AccessTokenRepository,
    RefreshTokenRepository,
    UserRepository,
} from './repositories';
import { AuthService, UserService } from './services';
import { AuthController, UserController } from './controllers';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { PassportModule } from '@nestjs/passport';
import { APP_PIPE } from '@nestjs/core';
import { JwtStrategy } from './securities/strategies';
import { JwtAuthGuard } from './securities/guards';
@Module({
    imports: [
        HttpModule,
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn: configService.get<string>('ACCESS_TOKEN_EXPIRY'),
                },
            }),
        }),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        TypeOrmModule.forFeature([User, AccessToken, RefreshToken]),
    ],
    controllers: [AuthController, UserController],
    providers: [
        UserService,
        AuthService,
        UserRepository,
        AccessTokenRepository,
        RefreshTokenRepository,
        JwtStrategy,
        JwtAuthGuard,
        {
            provide: APP_PIPE,
            useClass: ValidationPipe,
        },
    ],
    exports: [
        UserService,
        AuthService,
        UserRepository,
        AccessTokenRepository,
        RefreshTokenRepository,
    ],
})
export class AuthModule {}
