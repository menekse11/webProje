import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  ValidationPipe,
  Query,
} from '@nestjs/common';

import { BookService } from './books.service';
import { CreateBookDto } from './dto/createBookDto';
import { UpdateBookDto } from './dto/updateBookDto';
import { UseGuards } from '@nestjs/common';
import { Role } from '../auth/role.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('search')
  searchByName(@Query('name') name: string) {
    return this.bookService.searchByName(name);
  }

  @Get()
  listAll() {
    return this.bookService.listAll();
  }

  @Get(':id')
  show(@Param('id', ParseIntPipe) id: number) {
    return this.bookService.getOne(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Role('admin')
  create(@Body(ValidationPipe) createBook: CreateBookDto) {
    return this.bookService.create(createBook);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Role('admin')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body(ValidationPipe) updateBook: UpdateBookDto,
  ) {
    return this.bookService.update(+id, updateBook);
  }
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Role('admin')
  delete(@Param('id', ParseIntPipe) id: string) {
    return this.bookService.delete(+id);
  }
}
