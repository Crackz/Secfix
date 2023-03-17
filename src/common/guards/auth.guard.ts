import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

const allowedTokens = ['123', '567', '8910'];

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const headers = context.switchToHttp().getRequest().headers;

    if (!('authorization' in headers)) return false;

    const token = headers['authorization'];
    if (!allowedTokens.includes(token)) return false;

    return true;
  }
}
