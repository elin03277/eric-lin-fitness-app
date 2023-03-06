import { Field, ID, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { GraphQLString } from 'graphql';
import { Exercise } from 'src/exercise/exercise.entity';

@InputType()
export class CreateWorkoutInput {
  @IsString()
  @Field()
  name: string;

  @Field()
  type: string;

  @Field()
  description: string;

  @Field((type) => [GraphQLString])
  exerciseIds: string[];
}
