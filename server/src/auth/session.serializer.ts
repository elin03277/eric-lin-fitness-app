import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private usersService: UsersService) {
    super();
  }
  serializeUser(user: User, done: (err: Error, user: any) => void): any {
    done(null, { username: user.username });
  }
  deserializeUser(payload: any, done: (err: Error, payload: any) => void): any {
    const user = this.usersService.findByUsername(payload);
    done(null, user);
  }
}
