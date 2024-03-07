import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../services';
import { CreateUserDto, SignupResDto } from '../dto';
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Post('singup')
    async singup(@Body() createUserDto: CreateUserDto): Promise<SignupResDto> {
        const user = await this.userService.createUser(createUserDto);
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
        };
    }
}
