import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
  UseGuards,
  ValidationPipe,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/registerUserDto';
import { LoginUserDto } from './dto/loginUserDto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body(ValidationPipe) loginUser: LoginUserDto) {
    const user = await this.authService.validateUser(loginUser);
    if (!user) throw new UnauthorizedException('Wrong username or password');

    return this.authService.login(user);
  }

  @Post('register')
  create(@Body(ValidationPipe) registerUser: RegisterUserDto) {
    return this.authService.register(registerUser);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
