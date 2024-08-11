import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ProducerService } from './producer.service';

@Module({
  exports: [ProducerService],
  providers: [ProducerService],
  imports: [PrismaModule],
})
export class ProducerModule {}
