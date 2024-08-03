import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserSchema } from 'src/database/schemas/user.schema';
import { AuthModel } from 'src/database/models/auth.model';

import { AuthService } from 'src/auth/restapi/auth.service';
import { AuthController } from 'src/auth/restapi/auth.controller';

import { EmailService } from 'src/helper/mail.helper';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [AuthController],
  providers: [AuthService, EmailService, AuthModel],
  exports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
})
export class AuthModule {}
