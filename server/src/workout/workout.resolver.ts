import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Workout } from './workout.entity';
import { CreateWorkoutInput } from './workout.input';
import { WorkoutService } from './workout.service';

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

  @Mutation((returns) => Workout)
  createWorkout(
    @Args('createWorkoutInput') createWorkoutInput: CreateWorkoutInput,
  ) {
    return this.workoutService.createWorkout(createWorkoutInput);
  }
}
