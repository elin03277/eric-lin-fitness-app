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

  @Field()
  group: string;

  @Field()
  type: string;

  @Field()
  instructions: string;

  // @Field({ nullable: true })
  // workoutId?: string;
}
