import {
  IsOptional,
  IsString,
  IsEnum,
  IsDate,
  IsArray,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';
import { GenderEnum, HeroscopeEnum, ZodiacEnum } from '@prisma/client';

export class UpdateUserDetailDto {
  @IsOptional()
  @IsString()
  avatarPath?: string;

  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsEnum(GenderEnum)
  gender?: GenderEnum;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  birthdate?: Date;

  @IsOptional()
  @IsEnum(HeroscopeEnum)
  heroScopes?: HeroscopeEnum;

  @IsOptional()
  @IsEnum(ZodiacEnum)
  zodiac?: ZodiacEnum;

  @IsOptional()
  @IsString()
  height?: string;

  @IsOptional()
  @IsString()
  weight?: string;

  @IsOptional()
  @IsString()
  about?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  interests?: string[];
}
