import { ObjectType, Field, ID } from '@nestjs/graphql';
import { GraphQLString } from 'graphql';
import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity()
@ObjectType('User')
export class User {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  username: string;

  @Column()
  @Field()
  password: string;

  @Column()
  @Field((type) => [ID], { nullable: true })
  exerciseIds?: string[];

  @Column()
  @Field((type) => [ID], { nullable: true })
  workoutIds?: string[];
}
