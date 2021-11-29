import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email: email } });
  }

  async create(userDto: UserDto): Promise<any> {
    const newUser = this.userRepository.create(userDto);
    return this.userRepository.save(newUser);
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async update(id: string, userDto: UserDto): Promise<void> {
    await this.userRepository.update(id, userDto);
  }
}
