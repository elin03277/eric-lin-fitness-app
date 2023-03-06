import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseModule } from 'src/exercise/exercise.module';
import { Workout } from './workout.entity';
import { WorkoutResolver } from './workout.resolver';
import { WorkoutService } from './workout.service';

@Module({
  imports: [TypeOrmModule.forFeature([Workout]), ExerciseModule],
  providers: [WorkoutResolver, WorkoutService],
})
export class WorkoutModule {}
