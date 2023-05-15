import { Module } from '@nestjs/common';
import { PrismaService } from '@src/core/database/prisma/prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
