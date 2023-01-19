import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Exercise } from './exercise.entity';
import { ExerciseService } from './exercise.service';
import { GraphQLString } from 'graphql';

// Resolver of type exercise and this is where we define queries(retrieves data) or mutations(create new data or change existing data)
@Resolver((of) => Exercise)
export class ExerciseResolver {
  constructor(private exerciseService: ExerciseService) {}

  @Query((returns) => Exercise)
  exercise(@Args('id') id: string) {
    return this.exerciseService.getExercise(id);
  }

  @Mutation((returns) => Exercise)
  createExercise(
    @Args('name') name: string,
    @Args('equipment') equipment: string,
    @Args({ name: 'primaryMuscles', type: () => [GraphQLString] })
    primaryMuscles: string[],
    @Args({ name: 'secondaryMuscles', type: () => [GraphQLString] })
    secondaryMuscles: string[],
    @Args({ name: 'instructions', type: () => [GraphQLString] })
    instructions: string[],
  ) {
    return this.exerciseService.createExercise(
      name,
      equipment,
      primaryMuscles,
      secondaryMuscles,
      instructions,
    );
  }
}
