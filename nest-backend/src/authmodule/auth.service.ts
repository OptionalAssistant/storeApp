import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/usermodule/entities/user.entity';
import { UsersService } from 'src/usermodule/users.service';

import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(user: User){
    const foundUser = await this.usersService.findOne(user.email);

    if(!foundUser){
      throw new UnauthorizedException();
    }
    const isMatch = await bcrypt.compare(user.password,foundUser.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email };
  
    return await this.jwtService.signAsync(payload);
    
  }
  async register(user: User) {

    const foundUser = await this.usersService.findOne(user.email);

    if (foundUser) {
      throw new UnauthorizedException('User with that email already exist');
    }
    const payload = { sub: user.id, email: user.email };

    const hash = await bcrypt.hash(user.password, 10);

    user.password = hash;

    await this.usersService.create(user);
    
    return await this.jwtService.signAsync(payload);
  }
}
