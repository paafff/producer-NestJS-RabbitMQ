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
import { UserDetailService } from './user-detail.service';
import { UpdateUserDetailDto } from './dto/update-user-detail.dto';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';

@Controller('user-detail')
export class UserDetailController {
  constructor(private readonly userDetailService: UserDetailService) {}

  @UseGuards(JwtGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDetailDto: UpdateUserDetailDto,
  ) {
    return await this.userDetailService.update(id, updateUserDetailDto);
  }
}
