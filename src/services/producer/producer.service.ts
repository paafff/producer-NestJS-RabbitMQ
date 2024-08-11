import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class ProducerService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'events_queue',
        queueOptions: {
          durable: false,
        },
      },
    });
  }

  async sendUserCreatedEvent(user: any) {
    await this.client.emit('user_created', JSON.stringify(user));
  }

  async sendMessageCreatedEvent(message: any) {
    await this.client.emit('message_created', message);
  }
}
