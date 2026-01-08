import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './dto/registerUserDto';
import { LoginUserDto } from './dto/loginUserDto';
import { User } from 'src/users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginUser: LoginUserDto) {
    const user = await this.usersRepository.findOneBy({
      username: loginUser.username,
    });
    if (!user) return null;

    const ok = await bcrypt.compare(loginUser.password, user.password);
    return ok ? user : null;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      id: user.id,
      username: user.username,
      role: user.role,
      accessToken: this.jwtService.sign(payload),
    };
  }
  async register(registerUser: RegisterUserDto) {
    const hashedPassword = bcrypt.hashSync(registerUser.password, 10);
    const user = this.usersRepository.create({
      firstName: registerUser.firstName,
      lastName: registerUser.lastName,
      username: registerUser.username,
      email: registerUser.email,
      password: hashedPassword,
      role: registerUser.role || 'user',
    });
    user.password = hashedPassword;

    return this.usersRepository.save(user);
  }
}
