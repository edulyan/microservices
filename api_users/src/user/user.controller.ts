import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { IKafkaMessage } from 'src/interfaces/kafka-message.interface';
import { UserDto } from './dto/user.dto';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @MessagePattern('get.users')
  async getAll() {
    return this.userService.getAll();
  }

  // @MessagePattern('get.email')
  // @Post()
  // async getOne(@Param('email') email: IKafkaMessage<string>) {
  //   return this.userService.getByEmail(email.value);
  // }

  @MessagePattern('create.user')
  async create(@Payload() data: IKafkaMessage<User>) {
    return this.userService.create(data.value);
  }

  @MessagePattern('delete.user')
  async remove(@Payload() data: IKafkaMessage<User>) {
    return this.userService.remove(String(data.value.id));
  }

  @MessagePattern('update.user')
  async update(
    @Param() data: IKafkaMessage<User>,
    @Body() userDto: IKafkaMessage<UserDto>,
  ) {
    return this.userService.update(String(data.value.id), userDto.value);
  }
}
