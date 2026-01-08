import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/books/books.entity';
import { BookList } from 'src/book-list/book-list.entity';
import { User } from 'src/users/users.entity';
import { Review } from 'src/review/review.entity';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
    TypeOrmModule.forFeature([BookList]),
    TypeOrmModule.forFeature([Review]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
