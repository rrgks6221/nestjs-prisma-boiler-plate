import { Module } from '@nestjs/common';
import { UsersController } from '@src/apis/users/controllers/users.controller';
import { UsersService } from '@src/apis/users/services/users.service';
import { PrismaModule } from '@src/core/prisma/prisma.module';
import { IsRecordConstraint } from '@src/decorators/is-record.decorator';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService, IsRecordConstraint],
  exports: [UsersService],
})
export class UsersModule {}
