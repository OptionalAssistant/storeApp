import { Body, Controller, Get, Post, Res, UseGuards } from "@nestjs/common";
import { User } from "src/usermodule/entities/user.entity";
import { AuthService } from "./auth.service";
import { Role } from "./roles/role.enum";
import { Roles } from "./roles/roles.decorator";
import { AuthGuard } from "./auth.guard";
import { RolesGuard } from "./roles/roles.guard";
import { Response } from "express";

@Controller('auth')
export class AuthController{
    constructor(private readonly authService: AuthService){}

    @Post('login')
    async signIn(@Body() userDto : User,@Res() res: Response){
        const token = await this.authService.signIn(userDto);
        res.cookie('token', token, {
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production', // Use secure in production
            path: '/', // Make cookie accessible in all routes
          });
          return res.status(200).send({ message: 'Logged in successfully' });
    }
    
    @Roles(Role.Admin)
    @UseGuards(AuthGuard,RolesGuard)
    @Get('admin')
    checkAdmin(){
        return {isAuth : true};
    }

    @Roles(Role.User)
    @UseGuards(AuthGuard,RolesGuard)
    @Get('user')
    checkUser(){
        return {isAuth : true};
    }

    @Post('register')
    async register(@Body() userDto: User,@Res() res: Response){
        const token = await  this.authService.register(userDto);

        res.cookie('token', token, {
            secure: process.env.NODE_ENV === 'production', // Use secure in production
            path: '/', // Make cookie accessible in all routes
          });
          return res.status(200).send({ message: 'Logged in successfully' });

    }

    @Post('logout')
    async logout(@Res() res: Response) {
      res.clearCookie('token', { path: '/' }); // Clear the cookie
      return res.status(200).send({ message: 'Logged out successfully' });
    }

}