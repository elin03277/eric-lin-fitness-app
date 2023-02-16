import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  @UseGuards(JwtAuthGuard)
  findAll() {
    // findAll(@Context() context) {} will make the user available in context.user
    return this.usersService.getUsers();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('username') id: string) {
    return this.usersService.findOne(id);
  }
}
