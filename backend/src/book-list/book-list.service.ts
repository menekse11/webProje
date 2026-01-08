import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/books/books.entity';
import { BookList } from 'src/book-list/book-list.entity';
import { Review } from 'src/review/review.entity';
import { User } from 'src/users/users.entity';

import { CreateBookListDto } from './dto/createBookListDto';

@Injectable()
export class BookListService {
  constructor(
    @InjectRepository(Book) private booksRepository: Repository<Book>,
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Review) private reviewsRepository: Repository<Review>,
    @InjectRepository(BookList)
    private booklistsRepository: Repository<BookList>,
  ) {}

  async listAll(userId: number) {
    return this.booklistsRepository.find({
      where: { user: { id: userId } },
      relations: ['books'],
    });
  }

  async getOne(id: number, userId: number) {
    const list = await this.booklistsRepository.findOne({
      where: { id, user: { id: userId } },
      relations: ['books'],
    });
    if (!list) throw new NotFoundException('BookList not found');
    return list;
  }

  async create(createBookListDto: CreateBookListDto, userId: number) {
    const bookList = this.booklistsRepository.create({
      title: createBookListDto.title,
      user: { id: userId },
      books: [],
    });
    return this.booklistsRepository.save(bookList);
  }

  async delete(id: number, userId: number) {
    const bookList = await this.getOne(id, userId);
    return this.booklistsRepository.delete(bookList.id);
  }

  async addBook(listId: number, bookId: number, userId: number) {
    const list = await this.getOne(listId, userId);

    const book = await this.booksRepository.findOneBy({ id: bookId });
    if (!book) throw new NotFoundException('Book not found');

    if (list.books.some((b) => b.id === bookId)) {
      return list;
    }

    list.books.push(book);
    return this.booklistsRepository.save(list);
  }

  async removeBook(listId: number, bookId: number, userId: number) {
    const list = await this.getOne(listId, userId);

    list.books = list.books.filter((b) => b.id !== bookId);
    return this.booklistsRepository.save(list);
  }
}
