import { Injectable,HttpException,HttpStatus} from '@nestjs/common';
import { LoginResDto, TokenPayloadDto } from '../dto'
import * as argon2 from 'argon2'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'
import { UserRepository,RefreshTokenRepository,AccessTokenRepository } from '../repositories';
import { User } from '../entities'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
@Injectable()

export class AuthService {
    constructor(
        private readonly userRepository : UserRepository,
        private readonly accessTokenRepository : AccessTokenRepository,
        private readonly refreshTokenRepository : RefreshTokenRepository,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService
        
    ){}
    async login(email:string, password: string,):Promise<LoginResDto>{
        const user = await this.validateUser(email,password)
        const payload: TokenPayloadDto = this.createTokenPayload(user.id)
        const [accessToken, refreshToken] = await Promise.all([
            this.createAccessToken(user,payload),
            this.createRefreshToken(user,payload)
        ])
        return{
            accessToken,
            refreshToken,
            user: {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            },
        }
    }
    private async validateUser(email: string, password: string,):Promise<User>{
        const user = await this.userRepository.findOne({where:{email}})
        if(user && (await argon2.verify(user.password, password))){
            return user
        }
        throw new HttpException('Invalid email or password', HttpStatus.UNAUTHORIZED)
    }
    createTokenPayload(userId: string): TokenPayloadDto{
        return {
            sub: userId,
            iat: moment().unix(),
            jti: uuidv4(),
        }
    }
    async createAccessToken(user: User, payload: TokenPayloadDto): Promise<string>{
        const expiresIn = this.configService.get<string>('ACCESS_TOKEN_EXPIRY')
        const token  = this.jwtService.sign(payload,{expiresIn})
        const expiresAt = this.calculateExpiry(expiresIn)
        await this.accessTokenRepository.saveAccessToken(
            payload.jti,
            user,
            token,
            expiresAt
        )
        return token
    }
    async createRefreshToken(user: User, payload: TokenPayloadDto):Promise<string>{
        const expiresIn = this.configService.get<string>('REFRESH_TOKEN_EXPIRY')
        const token  = this.jwtService.sign(payload,{expiresIn})
        const expiresAt = this.calculateExpiry(expiresIn)
        await this.refreshTokenRepository.saveRefreshToken(
            payload.jti,
            user,
            token,
            expiresAt
        )
        return token
    }

    private calculateExpiry(expiry: string) : Date{
        const duration = moment.duration(expiry)
        if(!duration.isValid()){
            throw new HttpException('Invalid expiry time format', HttpStatus.BAD_REQUEST)
        }
        return moment().add(duration).toDate()
    }
}