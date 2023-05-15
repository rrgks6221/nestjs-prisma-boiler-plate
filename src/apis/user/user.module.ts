import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { PrismaModule } from '@src/core/database/prisma/prisma.module';
import { IsRecordConstraint } from '@src/decorators/is-record.decorator';
import { AuthModule } from '@src/core/auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [UserController],
  providers: [UserService, IsRecordConstraint],
})
export class UserModule {}
