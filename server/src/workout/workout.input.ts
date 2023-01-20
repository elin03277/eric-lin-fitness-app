import { Field, InputType } from '@nestjs/graphql';
import { Exercise } from 'src/exercise/exercise.entity';

@InputType()
export class CreateWorkoutInput {
  @Field()
  name: string;

  //   @Field((type) => [Exercise])
  //   exercises: Exercise[];
}
