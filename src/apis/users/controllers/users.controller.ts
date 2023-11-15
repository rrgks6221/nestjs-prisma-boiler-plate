import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
  Version,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@src/apis/auth/guards/jwt-auth.guard';
import { ApiUsers } from '@src/apis/users/controllers/users.swagger';
import { CreateUserRequestBodyDto } from '@src/apis/users/dto/create-user-request-body.dto';
import { FindUserListRequestQueryDto } from '@src/apis/users/dto/find-user-list-request-query.dto';
import { PatchUpdateUserRequestBodyDto } from '@src/apis/users/dto/patch-update-user-request-body.dto';
import { PutUpdateUserRequestBodyDto } from '@src/apis/users/dto/put-update-user-request-body.dto';
import { UserResponseDto } from '@src/apis/users/dto/user-response.dto';
import { UserEntity } from '@src/apis/users/entities/user.entity';
import { UsersService } from '@src/apis/users/services/users.service';
import { ApiVersion } from '@src/constants/enum';
import {
  ResponseType,
  SetResponse,
} from '@src/decorators/set-response.decorator';
import { User } from '@src/decorators/user.decorator';
import { ParsePositiveIntPipe } from '@src/pipes/parse-positive-int.pipe';
import { RestController } from '@src/types/type';
import { plainToInstance } from 'class-transformer';

@ApiTags('users')
@Controller('users')
export class UsersController
  implements Omit<RestController<UserResponseDto>, 'create'>
{
  constructor(private readonly userService: UsersService) {}

  @Version(ApiVersion.One)
  @SetResponse({ key: 'users', type: ResponseType.Pagination })
  @ApiUsers.FindAllAndCount({
    summary: '유저 리스트 조회',
    description: 'pagination',
  })
  @Get()
  async findAllAndCount(
    @Query() findUserListQueryDto: FindUserListRequestQueryDto,
  ): Promise<[UserResponseDto[], number]> {
    const [users, count] = await this.userService.findAllAndCount(
      findUserListQueryDto,
    );

    return [plainToInstance(UserResponseDto, users), count];
  }

  @Version(ApiVersion.One)
  @ApiUsers.FindOne({
    summary: '유저 단일 조회',
  })
  @SetResponse({ key: 'user', type: ResponseType.Detail })
  @Get(':userId')
  async findOne(
    @Param('userId', ParsePositiveIntPipe) userId: number,
  ): Promise<UserResponseDto> {
    const existUser = await this.userService.findOneOrNotFound(userId);

    const response = await this.userService.buildDetailResponse(existUser.id);

    return new UserResponseDto(response);
  }

  @Version(ApiVersion.One)
  @ApiUsers.Create({
    summary: '유저 생성(회원가입)',
  })
  @SetResponse({ key: 'user', type: ResponseType.Detail })
  @Post()
  async create(
    @Body() createUserRequestBodyDto: CreateUserRequestBodyDto,
  ): Promise<UserResponseDto> {
    const newUser = await this.userService.create(createUserRequestBodyDto);

    const response = await this.userService.buildDetailResponse(newUser.id);

    return new UserResponseDto(response);
  }

  @Version(ApiVersion.One)
  @ApiUsers.PatchUpdate({ summary: '유저 부분 수정' })
  @UseGuards(JwtAuthGuard)
  @SetResponse({ key: 'user', type: ResponseType.Detail })
  @Patch(':userId')
  async patchUpdate(
    @Param('userId', ParsePositiveIntPipe) userId: number,
    @Body() patchUpdateUserBodyDto: PatchUpdateUserRequestBodyDto,
    @User() user: UserEntity,
  ): Promise<UserResponseDto> {
    const newUser = await this.userService.patchUpdate(
      userId,
      user.id,
      patchUpdateUserBodyDto,
    );

    const response = await this.userService.buildDetailResponse(newUser.id);

    return new UserResponseDto(response);
  }

  @Version(ApiVersion.One)
  @ApiUsers.PatchUpdate({ summary: '유저 수정' })
  @UseGuards(JwtAuthGuard)
  @SetResponse({ key: 'user', type: ResponseType.Detail })
  @Put(':userId')
  async putUpdate(
    @Param('userId', ParsePositiveIntPipe) userId: number,
    @Body() putUpdateUserBodyDto: PutUpdateUserRequestBodyDto,
    @User() user: UserEntity,
  ): Promise<UserResponseDto> {
    const newUser = await this.userService.putUpdate(
      userId,
      user.id,
      putUpdateUserBodyDto,
    );

    const response = await this.userService.buildDetailResponse(newUser.id);

    return new UserResponseDto(response);
  }

  @Version(ApiVersion.One)
  @ApiUsers.Remove({ summary: '유저 삭제' })
  @UseGuards(JwtAuthGuard)
  @SetResponse({ type: ResponseType.Delete })
  @Delete(':userId')
  async remove(
    @Param('userId', ParsePositiveIntPipe) userId: number,
    @User() user: UserEntity,
  ): Promise<number> {
    return this.userService.remove(userId, user.id);
  }
}
