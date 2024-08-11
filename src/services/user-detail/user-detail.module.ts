import { Module } from '@nestjs/common';
import { UserDetailService } from './user-detail.service';
import { UserDetailController } from './user-detail.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [UserDetailController],
  providers: [UserDetailService],
  imports: [PrismaModule],
})
export class UserDetailModule {}
