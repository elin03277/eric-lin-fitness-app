import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercise } from './exercise.entity';
import { v4 as uuid } from 'uuid';
import { CreateExerciseInput } from './dto/exercise.input';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(Exercise)
    private exerciseRepository: Repository<Exercise>,
    private usersService: UsersService,
  ) {}

  async getExercise(id: string): Promise<Exercise> {
    return this.exerciseRepository.findOneByOrFail({ id });
  }

  async getFilteredExercises(filter: string): Promise<Exercise[]> {
    const exerciseFilter = filter.toLowerCase();
    const exercises = await this.exerciseRepository.find();

    const filteredExercises = exercises.filter(
      (exercise) =>
        exercise.name.toLowerCase().includes(exerciseFilter) ||
        exercise.equipment.toLowerCase().includes(exerciseFilter) ||
        exercise.group.toLowerCase().includes(exerciseFilter) ||
        exercise.type.toLowerCase().includes(exerciseFilter) ||
        exercise.instructions.toLowerCase().includes(exerciseFilter),
    );

    return filteredExercises;
  }

  // async getWorkoutExercises(exerciseIds: string[]): Promise<Exercise[]> {
  //   const workoutExercises = [];

  //   exerciseIds.forEach((id) => {
  //     const exercise = this.getExercise(id);

  //     if (exercise) {
  //       workoutExercises.push(exercise);
  //     }
  //   });

  //   return workoutExercises;
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
    userId: string,
  ): Promise<Exercise> {
    const { name, equipment, group, type, instructions } = createExerciseInput;

    const exercise = this.exerciseRepository.create({
      id: uuid(),
      name,
      equipment,
      group,
      type,
      instructions,
    });

    this.usersService.assignExerciseToUser(userId, exercise.id);

    return this.exerciseRepository.save(exercise);
  }
}
