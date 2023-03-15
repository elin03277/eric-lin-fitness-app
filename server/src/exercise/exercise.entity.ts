import { Field, ID, ObjectType } from '@nestjs/graphql';
import { GraphQLString } from 'graphql';
import { Workout } from 'src/workout/workout.entity';
import {
  Entity,
  PrimaryColumn,
  Column,
  ObjectIdColumn,
  ManyToMany,
  CreateDateColumn,
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
  group: string;

  @Column()
  @Field()
  type: string;

  @Column()
  @Field()
  instructions: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;
}
