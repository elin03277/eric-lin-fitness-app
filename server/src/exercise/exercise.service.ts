import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercise } from './exercise.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(Exercise)
    private exerciseRepository: Repository<Exercise>,
  ) {}

  async getExercise(id: string): Promise<Exercise> {
    return this.exerciseRepository.findOneBy({ id });
  }

  async createExercise(
    name,
    equipment,
    primaryMuscles,
    secondaryMuscles,
    instructions,
  ): Promise<Exercise> {
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
