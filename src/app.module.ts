import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/controllers/auth.controller';
import { APP_PIPE } from '@nestjs/core'

@Module({
  imports: [],
  controllers: [AppController, AuthController],
  providers: [AppService,{
    provide: APP_PIPE,
    useClass: ValidationPipe,
  }
  ],
})
export class AppModule {}
