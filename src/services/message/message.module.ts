import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ProducerModule } from '../producer/producer.module';

@Module({
  controllers: [MessageController],
  providers: [MessageService],
  imports: [PrismaModule, ProducerModule],
})
export class MessageModule {}
