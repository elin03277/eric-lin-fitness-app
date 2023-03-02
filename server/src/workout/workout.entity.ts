import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Exercise } from 'src/exercise/exercise.entity';
import {
  Column,
  Entity,
  // ManyToMany,
  ObjectIdColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity()
@ObjectType('Workout')
export class Workout {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  @Field((type) => ID)
  id: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  type: string;

  @Column()
  // @ManyToMany(() => Exercise, (exercise) => exercise.workouts)
  @Field((type) => [ID]) //, { nullable: true })
  exerciseIds: string[];

  //   @Column()
  //   @Field((type) => [Int])
  //   reps: number[];

  //   @Column()
  //   @Field((type) => [Int])
  //   sets: number[];

  //   @Column()
  //   @Field((type) => [Int])
  //   weight: number[];
}
