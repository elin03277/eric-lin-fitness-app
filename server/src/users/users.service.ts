import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const user = this.userRepository.create({
      id: uuid(),
      ...createUserInput,
    });

    return this.userRepository.save(user);
  }

  async getUser(id: string): Promise<User> {
    return this.userRepository.findOneByOrFail({ id });
  }

  async findOne(username: string): Promise<User> {
    return this.userRepository.findOneBy({ username });
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
}
