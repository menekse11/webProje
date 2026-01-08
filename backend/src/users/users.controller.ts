import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUserDto';
import { UpdateUserDto } from './dto/updateUserDto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  getMe(@Req() req: any) {
    const userId = req.user.id;
    return this.usersService.getMe(userId);
  }

  @Get()
  listAll() {
    return this.usersService.listAll();
  }

  @Get(':id')
  show(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getOne(id);
  }

  @Post()
  create(@Body(ValidationPipe) createUser: CreateUserDto) {
    return this.usersService.create(createUser);
  }
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body(ValidationPipe) updateUser: UpdateUserDto,
    @Req() req: any,
  ) {
    const userr = await this.usersService.getOne(+id);
    if (!userr) {
      throw new NotFoundException();
    }
    if (req.user.role !== 'admin' && userr.id !== req.user.id) {
      throw new ForbiddenException();
    }

    return this.usersService.update(+id, updateUser);
  }
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: string, @Req() req: any) {
    const userr = await this.usersService.getOne(+id);
    if (req.user.role !== 'admin' && userr !== req.user.id) {
      throw new ForbiddenException();
    }
    return this.usersService.delete(+id);
  }
}
