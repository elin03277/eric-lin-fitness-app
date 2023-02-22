import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercise } from './exercise.entity';
import { v4 as uuid } from 'uuid';
import { CreateExerciseInput } from './exercise.input';
import { WorkoutService } from '../workout/workout.service';
import { Workout } from '../workout/workout.entity';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(Exercise)
    private exerciseRepository: Repository<Exercise>,
    private workoutService: WorkoutService,
  ) {}

  async getExercise(id: string): Promise<Exercise> {
    return this.exerciseRepository.findOneByOrFail({ id });
  }

  // async getFilteredExercises(filter: string): Promise<Exercise[]> {
  //   return this.exerciseRepository.find( filter );
  // }

  async getExercises(offset: number, limit: number): Promise<Exercise[]> {
    return this.exerciseRepository.find({
      skip: offset,
      take: limit,
    });
  }

  async countExercises(): Promise<number> {
    return this.exerciseRepository.count();
  }

  async createExercise(
    createExerciseInput: CreateExerciseInput,
  ): Promise<Exercise> {
    const {
      name,
      equipment,
      pattern,
      instructions,
    } = // primaryMuscles, secondaryMuscles, instructions } =
      createExerciseInput;

    const exercise = this.exerciseRepository.create({
      id: uuid(),
      name,
      equipment,
      pattern,
      // primaryMuscles,
      // secondaryMuscles,
      instructions,
    });

    return this.exerciseRepository.save(exercise);
  }

  async getWorkout(workoutId: string): Promise<Workout> {
    return this.workoutService.getWorkout(workoutId);
  }
}
