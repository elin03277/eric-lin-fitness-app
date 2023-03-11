import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workout } from './workout.entity';
import { CreateWorkoutInput } from './workout.input';
import { v4 as uuid } from 'uuid';
import { ExerciseService } from 'src/exercise/exercise.service';
import { Exercise } from 'src/exercise/exercise.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class WorkoutService {
  constructor(
    @InjectRepository(Workout)
    private workoutRepository: Repository<Workout>,
    private exerciseService: ExerciseService,
    private usersService: UsersService,
  ) {}

  async getWorkout(id: string): Promise<Workout> {
    return this.workoutRepository.findOneByOrFail({ id });
  }

  async getWorkouts(): Promise<Workout[]> {
    return this.workoutRepository.find();
  }

  // async getWorkoutExercises(exerciseIds: string[]): Promise<Exercise[]> {
  //   return this.exerciseService.getWorkoutExercises(exerciseIds);
  // }

  async createWorkout(
    createWorkoutInput: CreateWorkoutInput,
    userId: string,
  ): Promise<Workout> {
    const { name, type, description, exerciseIds } = createWorkoutInput;
    // const workoutExercises = await this.exerciseService.getWorkoutExercises(
    //   exerciseIds,
    // );

    const workoutExercises = await Promise.all(
      exerciseIds.map((id) => this.exerciseService.getExercise(id)),
    );

    const workout = this.workoutRepository.create({
      id: uuid(),
      name,
      type,
      description,
      exercises: workoutExercises,
    });

    this.usersService.assignWorkoutToUser(userId, workout.id);

    return this.workoutRepository.save(workout);
  }
}
