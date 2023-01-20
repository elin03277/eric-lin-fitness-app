import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercise } from './exercise.entity';
import { v4 as uuid } from 'uuid';
import { CreateExerciseInput } from './exercise.input';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(Exercise)
    private exerciseRepository: Repository<Exercise>,
  ) {}

  async getExercise(id: string): Promise<Exercise> {
    return this.exerciseRepository.findOneBy({ id });
  }

  async getExercises(): Promise<Exercise[]> {
    return this.exerciseRepository.find();
  }

  async createExercise(
    createExerciseInput: CreateExerciseInput,
  ): Promise<Exercise> {
    const { name, equipment, primaryMuscles, secondaryMuscles, instructions } =
      createExerciseInput;

    const exercise = this.exerciseRepository.create({
      id: uuid(),
      name,
      equipment,
      primaryMuscles,
      secondaryMuscles,
      instructions,
    });

    return this.exerciseRepository.save(exercise);
  }
}
