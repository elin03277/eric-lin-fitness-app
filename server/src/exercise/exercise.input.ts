import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { GraphQLString } from 'graphql';

@InputType()
export class CreateExerciseInput {
  @IsString()
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
