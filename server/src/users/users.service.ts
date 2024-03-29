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
      exerciseIds: [],
      workoutIds: [],
    });

    return this.userRepository.save(user);
  }

  async getUser(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async findByUsername(username: string): Promise<User> {
    return this.userRepository.findOneBy({ username });
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async assignExerciseToUser(
    userId: string,
    exerciseId: string,
  ): Promise<User> {
    const user = await this.getUser(userId);
    user.exerciseIds = [...user.exerciseIds, exerciseId];
    this.userRepository.update(user._id, { exerciseIds: user.exerciseIds });

    return user;
  }

  async assignWorkoutToUser(userId: string, workoutId: string): Promise<User> {
    const user = await this.getUser(userId);
    user.workoutIds = [...user.workoutIds, workoutId];
    this.userRepository.update(user._id, { workoutIds: user.workoutIds });

    return user;
  }
}
