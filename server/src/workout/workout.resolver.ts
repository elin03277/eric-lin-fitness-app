import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
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
  getInitialWorkouts() {
    return this.workoutService.getInitialWorkouts();
  }

  @Query((returns) => [Workout])
  @UseGuards(JwtAuthGuard)
  getUserWorkouts(@Context('req') req) {
    console.log(req.user.userId);
    return this.workoutService.getUserWorkouts(req.user.userId);
  }

  @Mutation((returns) => Workout)
  @UseGuards(JwtAuthGuard)
  createWorkout(
    @Args('createWorkoutInput') createWorkoutInput: CreateWorkoutInput,
    @Context('req') req,
  ) {
    return this.workoutService.createWorkout(
      createWorkoutInput,
      req.user.userId,
    );
  }
}
