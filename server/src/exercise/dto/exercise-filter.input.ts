import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { GraphQLString } from 'graphql';
import { Exercise } from '../exercise.entity';

@InputType()
export class ExerciseFilterInput {
  @Field()
  filter: string;
}
