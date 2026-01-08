import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/books/books.entity';
import { BookList } from 'src/book-list/book-list.entity';
import { Review } from 'src/review/review.entity';
import { User } from 'src/users/users.entity';
import { BookListService } from './book-list.service';
import { BookListController } from './book-list.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
    TypeOrmModule.forFeature([BookList]),
    TypeOrmModule.forFeature([Review]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [BookListController],
  providers: [BookListService],
})
export class BookListModule {}
