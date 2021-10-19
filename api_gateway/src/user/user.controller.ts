import { Body, Controller, Get, Post } from '@nestjs/common';
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
    this.client.subscribeToResponseOf('get.users.list');
    this.client.subscribeToResponseOf('get.one.email');
    this.client.subscribeToResponseOf('create.new.user');
    this.client.subscribeToResponseOf('delete.one.user');

    await this.client.connect();
  }

  @Get()
  async get() {
    return this.client.send('get.users.list', '');
  }

  @Post()
  async createUser(@Body() userDto: UserDto) {
    console.log(userDto);
    return await this.client.send('create.new.user', userDto);
  }
}
