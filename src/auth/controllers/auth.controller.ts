import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from '../services';
import { LoginReqDto, LoginResDto } from '../dto';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post('login')
    async login(@Body() loginReqDto: LoginReqDto): Promise<LoginResDto> {
        return this.authService.login(loginReqDto.email, loginReqDto.password);
    }
}
