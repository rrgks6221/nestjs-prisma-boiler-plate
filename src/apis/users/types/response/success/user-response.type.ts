import { ApiProperty } from '@nestjs/swagger';

export class UserResponseType {
  @ApiProperty({
    example: 1,
    description: 'users 고유 id',
    required: true,
    type: 'string',
  })
  id: number;

  @ApiProperty({
    example: 'example@example.com',
    description: 'users eamil',
    required: true,
    type: 'string',
  })
  email: string;

  @ApiProperty({
    example: '홍길동',
    description: 'users 이름',
    required: true,
    type: 'string',
  })
  name: string;

  @ApiProperty({
    example: 1,
    description: 'users 권한',
    required: true,
    type: 'number',
  })
  role: number;

  @ApiProperty({
    example: '2022-10-03T09:54:50.563Z',
    description: 'users 생성일자',
    required: true,
    type: 'string',
  })
  createdAt: Date;
}
