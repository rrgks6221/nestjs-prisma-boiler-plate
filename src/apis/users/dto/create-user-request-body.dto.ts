import { IsEmail, IsNumber, IsString } from 'class-validator';
import { IsRecord } from '@src/decorators/is-record.decorator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LoginType, Role } from '@prisma/client';

export class CreateUserRequestBodyDto {
  @ApiProperty({
    description: '로그인 타입',
    enum: LoginType,
  })
  loginType: LoginType;

  @ApiProperty({
    example: 'password',
    description: 'users password',
    type: 'string',
  })
  @IsString()
  password: string;

  @ApiProperty({
    example: 'example@example.com',
    description: 'users eamil',
    required: true,
    type: 'string',
  })
  @IsEmail()
  @IsRecord({ model: 'user' }, false)
  email: string;

  @ApiProperty({
    example: '홍길동',
    description: 'users 이름',
    required: true,
    type: 'string',
  })
  @IsString()
  nickname: string;

  @ApiProperty({
    example: 1,
    description: 'users 권한',
    required: true,
    enum: Role,
  })
  @IsNumber()
  role: Role;
}
