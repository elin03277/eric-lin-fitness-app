import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Exercise } from './exercise.entity';
import { ExerciseService } from './exercise.service';
import { CreateExerciseInput } from './exercise.input';
import { Workout } from '../workout/workout.entity';

// Resolver of type exercise and this is where we define queries(retrieves data) or mutations(create new data or change existing data)
@Resolver((of) => Exercise)
export class ExerciseResolver {
  constructor(private exerciseService: ExerciseService) {}

  @Query((returns) => Exercise)
  exercise(@Args('id') id: string) {
    return this.exerciseService.getExercise(id);
  }

  @Query((returns) => [Exercise])
  exercises() {
    return this.exerciseService.getExercises();
  }

  @ResolveField((returns) => Workout)
  workout(@Parent() exercise: Exercise): Promise<Workout> {
    return this.exerciseService.getWorkout(exercise.id);
  }

  @Mutation((returns) => Exercise)
  createExercise(
    @Args('createExerciseInput') createExerciseInput: CreateExerciseInput,
  ) {
    return this.exerciseService.createExercise(createExerciseInput);
  }
}
