import {
  Args,
  Context,
  ID,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Exercise } from './exercise.entity';
import { ExerciseService } from './exercise.service';
import { CreateExerciseInput } from './dto/exercise.input';
import { ExerciseFilterInput } from './dto/exercise-filter.input';
import { Workout } from '../workout/workout.entity';
import { GraphQLInt } from 'graphql';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

// Resolver of type exercise and this is where we define queries(retrieves data) or mutations(create new data or change existing data)
@Resolver((of) => Exercise)
export class ExerciseResolver {
  constructor(private exerciseService: ExerciseService) {}

  @Query((returns) => Exercise)
  exercise(@Args('id') id: string) {
    return this.exerciseService.getExercise(id);
  }

  @Query((returns) => [Exercise])
  getFilteredExercises(@Args('filter') filter: string) {
    return this.exerciseService.getFilteredExercises(filter);
  }

  @Query((returns) => [Exercise])
  getExercises(
    @Args('offset', { type: () => Int }) offset: number,
    @Args('limit', { type: () => Int }) limit: number,
  ) {
    return this.exerciseService.getExercises(offset, limit);
  }

  @Query((returns) => GraphQLInt)
  countExercises() {
    return this.exerciseService.countExercises();
  }

  // @ResolveField((returns) => Workout)
  // workout(@Parent() exercise: Exercise) {
  //   return this.exerciseService.getWorkout(exercise.id);
  // }

  // @Mutation((returns) => [ID])
  // assignWorkoutToExercise(
  //   @Args('exerciseId', { type: () => ID }) exerciseId: string,
  //   @Args('workoutId', { type: () => ID }) workoutId: string,
  // ) {
  //   return this.exerciseService.assignWorkoutToExercise(exerciseId, workoutId);
  // }

  @Mutation((returns) => Exercise)
  @UseGuards(JwtAuthGuard)
  createExercise(
    @Args('createExerciseInput') createExerciseInput: CreateExerciseInput,
    @Context('req') req,
  ) {
    return this.exerciseService.createExercise(
      createExerciseInput,
      req.user.userId,
    );
  }
}
