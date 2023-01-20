import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { ExerciseModule } from './exercise/exercise.module';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'ormconfig';
import { WorkoutModule } from './workout/workout.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    ExerciseModule,
    WorkoutModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
