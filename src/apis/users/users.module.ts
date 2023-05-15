import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { PrismaModule } from '@src/core/database/prisma/prisma.module';
import { IsRecordConstraint } from '@src/decorators/is-record.decorator';
import { AuthModule } from '@src/core/auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [UsersController],
  providers: [UsersService, IsRecordConstraint],
})
export class UsersModule {}
