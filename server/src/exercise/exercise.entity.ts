import { Field, ID, ObjectType } from '@nestjs/graphql';
import { GraphQLString } from 'graphql';
import { Entity, PrimaryColumn, Column, ObjectIdColumn } from 'typeorm';

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
  @Field((type) => [GraphQLString])
  primaryMuscles: string[];

  @Column()
  @Field((type) => [GraphQLString])
  secondaryMuscles: string[];

  @Column()
  @Field((type) => [GraphQLString])
  instructions: string[];
}
