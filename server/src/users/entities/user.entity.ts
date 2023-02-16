import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
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
}
