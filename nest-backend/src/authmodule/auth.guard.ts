import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UsersService } from 'src/usermodule/users.service';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(
      private jwtService: JwtService,
      private usersService: UsersService
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException();
      }

      try {
        const payload = await this.jwtService.verifyAsync(token);

        const user = await this.usersService.findOne(payload.email); // Assuming the token contains the user's ID in 'sub'

        if (!user) {
          throw new UnauthorizedException('User not found');
        }

        request['user'] = user;
      } catch(error) {
        console.error("Token verification error:", error); // Log the error details
        throw new UnauthorizedException();
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }