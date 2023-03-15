import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { GraphQLString } from 'graphql';
import { Exercise } from 'src/exercise/exercise.entity';
import {
  Column,
  CreateDateColumn,
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
  @Field()
  description: string;

  @Column()
  // @ManyToMany(() => Exercise, (exercise) => exercise.workouts)
  @Field((type) => [Exercise]) //, { nullable: true })
  exercises: Exercise[];

  @CreateDateColumn()
  @Field()
  createdAt: Date;
}
