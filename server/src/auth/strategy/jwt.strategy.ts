import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET, // Rememeber to hide key
      // logging: true,
    });
  }

  async validate(payload: any): Promise<any> {
    // payload = decoded JWT
    // get user call like in local strategy, then return what you want as part of the context
    return { userId: payload.sub, username: payload.username };
  }
}
