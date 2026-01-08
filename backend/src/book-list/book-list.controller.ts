import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  ValidationPipe,
  Request,
} from '@nestjs/common';
import { BookListService } from './book-list.service';
import { CreateBookListDto } from './dto/createBookListDto';
import { AuthGuard } from '@nestjs/passport';

@Controller('booklists')
export class BookListController {
  constructor(private readonly booklistService: BookListService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  listAll(@Request() req) {
    return this.booklistService.listAll(req.user.id);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  show(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.booklistService.getOne(id, req.user.id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(
    @Body(ValidationPipe) createBookList: CreateBookListDto,
    @Request() req,
  ) {
    return this.booklistService.create(createBookList, req.user.id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  delete(@Param('id', ParseIntPipe) id: string, @Request() req) {
    return this.booklistService.delete(+id, req.user.id);
  }
  @Post(':id/books/:bookId')
  @UseGuards(AuthGuard('jwt'))
  addBook(
    @Param('id', ParseIntPipe) id: number,
    @Param('bookId', ParseIntPipe) bookId: number,
    @Request() req,
  ) {
    return this.booklistService.addBook(id, bookId, req.user.id);
  }

  @Delete(':id/books/:bookId')
  @UseGuards(AuthGuard('jwt'))
  removeBook(
    @Param('id', ParseIntPipe) id: number,
    @Param('bookId', ParseIntPipe) bookId: number,
    @Request() req,
  ) {
    return this.booklistService.removeBook(id, bookId, req.user.id);
  }
}
