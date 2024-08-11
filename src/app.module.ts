import { Module } from '@nestjs/common';
import { UsersModule } from './services/user/users.module';
import { InitializationModule } from './services/initialization/initialization.module';
import { AuthModule } from './services/auth/auth.module';
import { UserDetailModule } from './services/user-detail/user-detail.module';
import { ProducerModule } from './services/producer/producer.module';
import { ProducerService } from './services/producer/producer.service';
import { MessageModule } from './services/message/message.module';

@Module({
  imports: [
    UsersModule,
    InitializationModule,
    AuthModule,
    UserDetailModule,
    ProducerModule,
    MessageModule,
  ],
  controllers: [],
  providers: [ProducerService],
})
export class AppModule {}
