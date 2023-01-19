import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercise } from './exercise.entity';
import { ExerciseResolver } from './exercise.resolver';
import { ExerciseService } from './exercise.service';

// Groups related functionality (usually includes controllers, services, and providers(in this case GraphQL resolvers))
@Module({
  imports: [TypeOrmModule.forFeature([Exercise])],
  providers: [ExerciseResolver, ExerciseService],
})
export class ExerciseModule {}
