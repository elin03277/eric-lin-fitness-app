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

  async getInitialWorkouts(): Promise<Workout[]> {
    return this.workoutRepository.find({
      where: { userId: 'dfd51180-13a6-460d-b123-2574290cf122' },
      order: { createdAt: 'DESC' },
    });
  }

  async getUserWorkouts(userId: string): Promise<Workout[]> {
    return this.workoutRepository.find({
      where: {
        $or: [
          { userId: userId },
          { userId: 'dfd51180-13a6-460d-b123-2574290cf122' },
        ],
      },
      order: { createdAt: 'DESC' },
    } as unknown);
  }

  async createWorkout(
    createWorkoutInput: CreateWorkoutInput,
    userId: string,
  ): Promise<Workout> {
    const { name, type, description, exerciseIds } = createWorkoutInput;
    const workoutExercises = await Promise.all(
      exerciseIds.map((id) => this.exerciseService.getExercise(id)),
    );

    const workout = this.workoutRepository.create({
      id: uuid(),
      name,
      type,
      description,
      exercises: workoutExercises,
      userId: userId,
    });

    this.usersService.assignWorkoutToUser(userId, workout.id);

    return this.workoutRepository.save(workout);
  }
}
