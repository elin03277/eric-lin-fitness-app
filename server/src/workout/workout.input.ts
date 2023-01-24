import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { GraphQLString } from 'graphql';
import { Exercise } from 'src/exercise/exercise.entity';

@InputType()
export class CreateWorkoutInput {
  @IsString()
  @Field()
  name: string;

  // @Field((type) => [GraphQLString])
  // exercises: string[];

  //   @Field((type) => [Exercise])
  //   exercises: Exercise[];
}
