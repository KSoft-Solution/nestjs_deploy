import {
  Global,
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { configEnvs } from 'src/config/config';
import { ErrorResponse } from 'src/helper/error.helper';
import { JWTService } from 'src/helper/jwt.helper';
import { LoggerMiddleware } from 'src/middleware/logger.middleware';
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    MongooseModule.forRoot(configEnvs.mongoURL),
    JwtModule.register({
      secret: configEnvs.jwt_secret_key,
      signOptions: {
        algorithm: 'HS512',
        expiresIn: configEnvs.jwt_expires_in,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, JWTService, ErrorResponse],
  exports: [JWTService, ErrorResponse],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: 'api/v1/reviews/:productId', method: RequestMethod.GET })
      .forRoutes({ path: 'api/v1/user', method: RequestMethod.ALL });
  }
}
