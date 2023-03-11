import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { WorkoutModule } from '../workout/workout.module';
import { Exercise } from './exercise.entity';
import { ExerciseResolver } from './exercise.resolver';
import { ExerciseService } from './exercise.service';

// Groups related functionality (usually includes controllers, services, and providers(in this case GraphQL resolvers))
@Module({
  imports: [TypeOrmModule.forFeature([Exercise]), UsersModule],
  providers: [ExerciseResolver, ExerciseService],
  exports: [ExerciseService],
})
export class ExerciseModule {}
