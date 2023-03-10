import { Field, ID, ObjectType } from '@nestjs/graphql';
import { GraphQLString } from 'graphql';
import { Workout } from 'src/workout/workout.entity';
import {
  Entity,
  PrimaryColumn,
  Column,
  ObjectIdColumn,
  ManyToMany,
} from 'typeorm';

// Exercise entity and object type
@Entity()
@ObjectType('Exercise')
export class Exercise {
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
  equipment: string;

  @Column()
  @Field()
  pattern: string;

  @Column()
  @Field()
  instructions: string;

  @Column()
  @Field((type) => [ID], { nullable: true })
  workoutIds?: string[];

  // @ManyToMany(() => Workout, (workout) => workout.exercises)
  // @Field((type) => Workout, { nullable: true })
  // workouts?: Workout[];
}
