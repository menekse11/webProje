import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './books/books.entity';
import { User } from './users/users.entity';
import { Review } from './review/review.entity';
import { BookList } from './book-list/book-list.entity';
import { UsersModule } from './users/users.module';
import { BookModule } from './books/books.module';
import { AuthModule } from './auth/auth.module';
import { ReviewModule } from './review/review.module';
import { BookListModule } from './book-list/book-list.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      process.env.DATABASE_URL
        ? {
            type: 'postgres',
            url: process.env.DATABASE_URL,
            entities: [Book, BookList, User, Review],
            synchronize: true,
            ssl: { rejectUnauthorized: false },
          }
        : {
            type: 'sqlite',
            database: 'diaryb-db.sqlite',
            entities: [Book, BookList, User, Review],
            synchronize: true,
          },
    ),
    UsersModule,
    BookModule,
    AuthModule,
    ReviewModule,
    BookListModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
