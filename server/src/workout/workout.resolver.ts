import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Exercise } from '../exercise/exercise.entity';
import { Workout } from './workout.entity';
import { CreateWorkoutInput } from './workout.input';
import { WorkoutService } from './workout.service';
import { GraphQLString } from 'graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Resolver((of) => Workout)
export class WorkoutResolver {
  constructor(private workoutService: WorkoutService) {}

  @Query((returns) => Workout)
  getWorkout(@Args('id') id: string) {
    return this.workoutService.getWorkout(id);
  }

  @Query((returns) => [Workout])
  getWorkouts() {
    return this.workoutService.getWorkouts();
  }

  // @Query((returns) => [Exercise])
  // getWorkoutExercises(
  //   @Args('exerciseIds', { type: () => [GraphQLString] }) exerciseIds: string[],
  // ) {
  //   return this.workoutService.getWorkoutExercises(exerciseIds);
  // }

  @Mutation((returns) => Workout)
  @UseGuards(JwtAuthGuard)
  createWorkout(
    @Args('createWorkoutInput') createWorkoutInput: CreateWorkoutInput,
  ) {
    return this.workoutService.createWorkout(createWorkoutInput);
  }
}
