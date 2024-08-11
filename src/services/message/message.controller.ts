import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(@Body() createMessageDto: CreateMessageDto) {
    return await this.messageService.create(createMessageDto);
  }

  @Get()
  async findAll() {
    return await this.messageService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.messageService.findOne(+id);
  }
}
