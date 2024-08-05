import { join } from 'path';
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
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { configEnvs } from 'src/config/config';
import { ErrorResponse } from 'src/helper/error.helper';
import { JWTService } from 'src/helper/jwt.helper';
import { LoggerMiddleware } from 'src/middleware/logger.middleware';

import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { EventsModule } from 'src/websocket/websocket.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { BrandModule } from 'src/brand/brand.module';

import { UploadController } from 'src/upload/upload.controller';
import { UploadService } from './upload/upload.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    MongooseModule.forRoot(configEnvs.mongoURL, {
      dbName: configEnvs.databaseName,
    }),
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   introspection: true,
    //   fieldResolverEnhancers: ['guards'],
    //   autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    //   //   buildSchemaOptions: {
    //   //      numberScalarMode: 'integer',
    //   //   },
    // }),
    MulterModule.register({
      dest: './files',
      storage: memoryStorage(),
    }),
    JwtModule.register({
      secret: configEnvs.jwt_secret_key,
      signOptions: {
        algorithm: 'HS512',
        expiresIn: configEnvs.jwt_expires_in,
      },
    }),
    AuthModule,
    UserModule,
    EventsModule,
    CloudinaryModule,
    BrandModule,
  ],
  controllers: [UploadController],
  providers: [JWTService, ErrorResponse, UploadService],
  exports: [JWTService, ErrorResponse, UploadService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: 'api/v1/reviews/:productId', method: RequestMethod.GET })
      .forRoutes({ path: 'api/v1/user', method: RequestMethod.ALL });
  }
}
