import { Field, ID, ObjectType } from '@nestjs/graphql';
import { GraphQLString } from 'graphql';
import { Entity, PrimaryColumn, Column, ObjectIdColumn } from 'typeorm';

// Exercise entity or object type
@Entity()
@ObjectType()
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
  /*
    id
    name
    description
    categorl
    image_url
    video_url
    */
  /*
    "name": "Double Kettlebell Alternating Hang Clean",
  "force": "pull",
  "level": "intermediate",
  "mechanic": "compound",
  "equipment": "kettlebells",
  "primaryMuscles": [
    "hamstrings"
  ],
  "secondaryMuscles": [
    "biceps",
    "calves",
    "forearms",
    "glutes",
    "lower back",
    "quadriceps",
    "traps"
  ],
  "instructions": [
    "Place two kettlebells between your feet. To get in the starting position, push your butt back and look straight ahead.",
    "Clean one kettlebell to your shoulder and hold on to the other kettlebell.",
    "With a fluid motion, lower the top kettlebell while driving the bottom kettlebell up."
  ],
  "category": "strength"
    */
}
