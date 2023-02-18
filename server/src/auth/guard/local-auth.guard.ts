import { Injectable, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor() {
    super();
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext();

    request.body = ctx.getArgs().loginUserInput;

    return request;
  }

  // async canActivate(context: ExecutionContext) {
  //   await super.canActivate(context);
  //   const ctx = GqlExecutionContext.create(context);
  //   const req = ctx.getContext().req;
  //   await super.logIn(req);
  //   return true;
  // }
}
