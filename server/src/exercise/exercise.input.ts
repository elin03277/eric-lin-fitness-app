import { Field, InputType } from '@nestjs/graphql';
import { GraphQLString } from 'graphql';

@InputType()
export class CreateExerciseInput {
  @Field()
  name: string;

  @Field()
  equipment: string;

  @Field((type) => [GraphQLString])
  primaryMuscles: string[];

  @Field((type) => [GraphQLString])
  secondaryMuscles: string[];

  @Field((type) => [GraphQLString])
  instructions: string[];
}
