import { Injectable } from '@nestjs/common';
import { UpdateUserDetailDto } from './dto/update-user-detail.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserDetailService {
  constructor(private readonly prisma: PrismaService) {}

  async update(id: string, updateUserDetailDto: UpdateUserDetailDto) {
    return await this.prisma.userDetail.update({
      where: {
        id: id,
      },
      data: updateUserDetailDto,
    });
  }
}
