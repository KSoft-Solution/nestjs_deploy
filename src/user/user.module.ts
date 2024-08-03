import { UserModel } from 'src/database/models/user.model';
import { Module } from '@nestjs/common';

import { AuthModule } from 'src/auth/auth.module';

import { UserService } from 'src/user/restapi/user.service';
import { UserController } from 'src/user/restapi/user.controller';

@Module({
  imports: [AuthModule],
  controllers: [UserController],
  providers: [UserService, UserModel],
})
export class UserModule {}