import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/books/books.entity';
import { BookList } from 'src/book-list/book-list.entity';
import { Review } from 'src/review/review.entity';
import { BookService } from './books.service';
import { BookController } from './books.controller';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [TypeOrmModule.forFeature([Book, BookList, Review]), AuthModule],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
