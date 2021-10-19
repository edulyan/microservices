import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  users: Array<UserDto>;

  constructor() {
    this.users = [];
  }

  async getAll(): Promise<UserDto[]> {
    return await this.users;
  }

  async getByEmail(email: string) {
    return this.users.find((el) => el.email === email);
  }

  async create(userDto: UserDto) {
    this.users.push(userDto);
    return this.users[this.users.length - 1];
    // const newUser = await this.userRepository.create(userDto);
    // return this.userRepository.save(newUser);
  }

  async remove(index: number): Promise<void> {
    await this.users.splice(index, index);
  }
}
