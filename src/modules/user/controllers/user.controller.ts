import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserResponseType } from '@src/modules/user/types/response/success/create-user-response.type';
import { IdParamDto } from '@src/dtos/id-param.dto';

@ApiTags('유저')
@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: '유저 생성' })
  @ApiCreatedResponse({ type: CreateUserResponseType })
  create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreateUserResponseType> {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  findOne(@Param() param: IdParamDto) {
    return this.userService.findOne(+param);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
