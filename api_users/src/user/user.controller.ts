import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { IKafkaMessage } from 'src/interfaces/kafka-message.interface';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @MessagePattern('get.users.list')
  @Get()
  async getAll() {
    return this.userService.getAll();
  }

  @MessagePattern('get.one.email')
  @Get(':email')
  async getOne(@Param('email') email: IKafkaMessage<string>) {
    return this.userService.getByEmail(email.value);
  }

  @MessagePattern('create.new.user')
  @Post()
  async create(@Body() userDto: IKafkaMessage<UserDto>) {
    return this.userService.create(userDto.value);
  }

  @MessagePattern('delete.one.user')
  @Delete(':id')
  async remove(@Param('index') index: IKafkaMessage<number>) {
    return this.userService.remove(index.value);
  }
}
