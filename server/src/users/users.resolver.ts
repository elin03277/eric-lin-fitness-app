import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { SessionAuthGuard } from '../auth/guard/session-auth.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.getUsers();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('username') id: string) {
    return this.usersService.findByUsername(id);
  }

  @Mutation((returns) => User)
  assignExerciseToUser(
    @Args('userId') userId: string,
    @Args('exerciseId') exerciseId: string,
  ) {
    return this.usersService.assignExerciseToUser(userId, exerciseId);
  }

  @Mutation((returns) => User)
  assignWorkoutToUser(
    @Args('userId') userId: string,
    @Args('workoutId') workoutId: string,
  ) {
    return this.usersService.assignWorkoutToUser(userId, workoutId);
  }
}
