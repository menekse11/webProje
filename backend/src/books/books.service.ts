import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/books/books.entity';
import { BookList } from 'src/book-list/book-list.entity';
import { Review } from 'src/review/review.entity';
import { Like } from 'typeorm';

import { CreateBookDto } from './dto/createBookDto';
import { UpdateBookDto } from './dto/updateBookDto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private booksRepository: Repository<Book>,

    @InjectRepository(Review) private reviewsRepository: Repository<Review>,
    @InjectRepository(BookList)
    private booklistsRepository: Repository<BookList>,
  ) {}

  async searchByName(name: string) {
    if (!name) {
      return [];
    }
    return this.booksRepository.find({
      where: {
        title: Like(`%${name}%`),
      },
    });
  }

  async listAll() {
    return this.booksRepository.find();
  }

  getOne(id: number) {
    return this.booksRepository.findOneBy({ id });
  }

  async create(createBookDto: CreateBookDto) {
    const book = this.booksRepository.create(createBookDto);
    return this.booksRepository.save(book);
  }
  async update(id: number, updateBookDto: UpdateBookDto) {
    const book = await this.getOne(id);
    if (!book) throw new NotFoundException();
    Object.assign(book, updateBookDto);
    return this.booksRepository.save(book);
  }
  async delete(id: number) {
    return this.booksRepository.delete(id);
  }
}
