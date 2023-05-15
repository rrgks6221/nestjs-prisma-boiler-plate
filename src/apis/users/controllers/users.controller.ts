import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  IntersectionType,
} from '@nestjs/swagger';
import { UserResponseType } from '@src/apis/users/types/response/success/user-response.type';
import { IdRequestParamDto } from '@src/dtos/id-request-param.dto';
import { User } from '@prisma/client';
import { AccessTokenType } from '@src/apis/users/types/access-token.type';
import { SetModelNameToParam } from '@src/decorators/set-model-name-to-param.decorator';
import { ModelName } from '@src/constants/enum';
import { UsersService } from '../services/users.service';
import { CreateUserRequestBodyDto } from '../dto/create-user-request-body.dto';

@ApiTags('유저')
@Controller('api/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @ApiOperation({ summary: '유저 생성' })
  @ApiCreatedResponse({
    type: IntersectionType(UserResponseType, AccessTokenType),
  })
  create(
    @Body() createUserDto: CreateUserRequestBodyDto,
  ): Promise<Omit<User, 'password'> & AccessTokenType> {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  @ApiOperation({ summary: '유저 조회' })
  @ApiOkResponse({ type: UserResponseType })
  findOne(
    @Param() @SetModelNameToParam(ModelName.User) param: IdRequestParamDto,
  ): Promise<Omit<User, 'password'>> {
    return this.userService.findOne(param.id);
  }
}
