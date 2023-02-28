import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workout } from './workout.entity';
import { CreateWorkoutInput } from './workout.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class WorkoutService {
  constructor(
    @InjectRepository(Workout)
    private workoutRepository: Repository<Workout>,
  ) {}

  async getWorkout(id: string): Promise<Workout> {
    return this.workoutRepository.findOneByOrFail({ id });
  }

  async getWorkouts(): Promise<Workout[]> {
    return this.workoutRepository.find();
  }

  async createWorkout(
    createWorkoutInput: CreateWorkoutInput,
  ): Promise<Workout> {
    const { name, type, exerciseIds } = createWorkoutInput;

    const workout = this.workoutRepository.create({
      id: uuid(),
      name,
      type,
      exerciseIds,
    });

    return this.workoutRepository.save(workout);
  }
}
