import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserInput } from './dto/login-user.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);

    if (user) {
      const valid = bcrypt.compare(password, user?.password);

      if (valid) {
        const { password, ...result } = user;
        return result;
      }
    }

    return null;
  }

  async login(user: User): Promise<any> {
    return {
      access_token: this.jwtService.sign(
        {
          username: user.username,
          sub: user.id,
        },
        { expiresIn: '15m' },
      ),
      refresh_token: this.jwtService.sign(
        {
          username: user.username,
          sub: user.id,
        },
        { expiresIn: '7d' },
      ),
      user,
    };
  }

  async decode(token: string): Promise<User> {
    const decoded = this.jwtService.verify(token);
    // console.log(decoded.sub);
    const user = await this.usersService.findByUsername(decoded.username);

    if (!user) {
      throw new Error('Invalid token');
    }

    return user;
  }

  async refresh(refreshToken: string): Promise<any> {
    const decoded = this.jwtService.verify(refreshToken);
    const user = await this.usersService.findByUsername(decoded.id);

    if (!user) {
      throw new Error('Invalid token');
    }

    return {
      access_token: this.jwtService.sign(
        {
          username: user.username,
          sub: user.id,
        },
        { expiresIn: '2m' },
      ),
      // Give new refresh token?
      user,
    };
  }

  async signup(loginUserInput: LoginUserInput) {
    // Use unique constraint on user id or user name
    const user = await this.usersService.findByUsername(
      loginUserInput.username,
    );

    if (user) {
      throw new Error('User already exists!');
    }

    const password = await bcrypt.hash(loginUserInput.password, 10);

    return this.usersService.createUser({
      ...loginUserInput,
      password,
    });
  }
}
