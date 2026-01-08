import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookList } from 'src/book-list/book-list.entity';
import { Review } from 'src/review/review.entity';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookList]),
    TypeOrmModule.forFeature([Review]),
    TypeOrmModule.forFeature([User]),
  ],

  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
