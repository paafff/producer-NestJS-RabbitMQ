import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ProducerService } from '../producer/producer.service';

@Injectable()
export class MessageService {
  constructor(
    private prisma: PrismaService,
    private readonly producerService: ProducerService,
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    const { chatRoomId, content, receiverId, senderId } = createMessageDto;

    let chatRoomIdTwoUsers = chatRoomId ?? null;

    if (chatRoomId === null || chatRoomId === undefined) {
      const createChatRoom = await this.prisma.chatRoom.create({
        data: {
          name: `${senderId}-${receiverId}`,
          users: {
            createMany: {
              data: [{ userId: senderId }, { userId: receiverId }],
            },
          },
        },
      });

      chatRoomIdTwoUsers = createChatRoom.id;
    }

    const message = await this.prisma.message.create({
      data: {
        chatRoomId: chatRoomIdTwoUsers,
        content,
        senderId,
      },
    });

    // Kirim event setelah pesan berhasil dibuat
    await this.producerService.sendMessageCreatedEvent({
      chatRoomId: chatRoomIdTwoUsers,
      content,
      senderId,
      receiverId,
    });

    return message;
  }

  findAll() {
    return `This action returns all message`;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }
}
