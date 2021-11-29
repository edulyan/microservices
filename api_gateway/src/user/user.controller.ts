import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'users',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'users-consumer',
      },
    },
  })
  client: ClientKafka;

  async onModuleInit() {
    this.client.subscribeToResponseOf('get.users');
    this.client.subscribeToResponseOf('get.email');
    this.client.subscribeToResponseOf('create.user');
    this.client.subscribeToResponseOf('delete.user');
    this.client.subscribeToResponseOf('update.user');

    await this.client.connect();
  }

  @Get()
  async get() {
    return this.client.send('get.users', '');
  }

  // @Post()
  // async getEmail(@Param() email: string) {
  //   return this.client.send('get.one.email', email);
  // }

  @Post()
  async createUser(@Body() userDto: UserDto) {
    console.log(userDto);
    return this.client.send('create.user', userDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.client.emit('delete.user', { id });
  }

  @Put()
  async update() {}
}
