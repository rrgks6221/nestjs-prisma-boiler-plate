import { Module } from '@nestjs/common';
import { UsersController } from '@src/apis/users/controllers/users.controller';
import { UsersService } from '@src/apis/users/services/users.service';
import { BCRYPT_TOKEN } from '@src/constants/token.constant';
import { PrismaModule } from '@src/core/prisma/prisma.module';
import { QueryHelper } from '@src/helpers/query.helper';
import bcrypt from 'bcrypt';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    QueryHelper,
    {
      provide: BCRYPT_TOKEN,
      useValue: bcrypt,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
