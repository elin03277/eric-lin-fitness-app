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

  // @Column()
  // @Field((type) => [GraphQLString])
  // primaryMuscles: string[];

  // @Column()
  // @Field((type) => [GraphQLString])
  // secondaryMuscles: string[];

  // @Column()
  // @Field((type) => [GraphQLString])
  // instructions: string[];

  @Column()
  @Field()
  instructions: string;

  @Column()
  @Field((type) => [GraphQLString], { nullable: true })
  workoutId: string[];

  @ManyToMany(() => Workout, (workout) => workout.exercises)
  @Field((type) => Workout, { nullable: true })
  workout: Workout;
}
