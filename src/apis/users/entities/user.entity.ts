import { ApiProperty } from '@nestjs/swagger';
import { LoginType, User } from '@prisma/client';
import { USER_NICKNAME_LENGTH } from '@src/apis/users/constants/user.constant';
import { BaseEntity } from '@src/entities/base.entity';
import { Exclude } from 'class-transformer';

export class UserEntity extends BaseEntity implements User {
  @Exclude()
  password: string | null;

  @ApiProperty({
    description: 'user login type',
    enum: LoginType,
  })
  loginType: LoginType;

  @ApiProperty({
    description: 'email',
    format: 'email',
  })
  email: string;

  @ApiProperty({
    description: 'nickname',
    minLength: USER_NICKNAME_LENGTH.MIN,
    maxLength: USER_NICKNAME_LENGTH.MAX,
  })
  nickname: string;

  constructor(userEntity: Partial<UserEntity> = {}) {
    super();

    Object.assign(this, userEntity);
  }
}
