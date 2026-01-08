import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/books/books.entity';
import { BookList } from 'src/book-list/book-list.entity';
import { Review } from 'src/review/review.entity';
import { User } from 'src/users/users.entity';
import { CreateReviewDto } from './dto/createReviewDto';
import { UpdateReviewDto } from './dto/updateReviewDto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Book) private booksRepository: Repository<Book>,
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Review) private reviewsRepository: Repository<Review>,
    @InjectRepository(BookList)
    private booklistsRepository: Repository<BookList>,
  ) {}

  async listAll(userId: number) {
    return this.reviewsRepository.find({
      where: { user: { id: userId } },
      relations: ['book'],
    });
  }

  async getOne(id: number, userId: number) {
    return this.reviewsRepository.findOne({
      where: { id, user: { id: userId } },
      relations: ['book'],
    });
  }
  async getByBook(bookId: number, userId: number) {
    return this.reviewsRepository.findOne({
      where: {
        book: { id: bookId },
        user: { id: userId },
      },
    });
  }

  async create(bookId: number, dto: CreateReviewDto, userId: number) {
    return this.reviewsRepository.save({
      ...dto,
      book: { id: bookId },
      user: { id: userId },
    });
  }

  async update(id: number, updateReviewDto: UpdateReviewDto, userId: number) {
    const review = await this.reviewsRepository.findOne({
      where: { id, user: { id: userId } },
    });
    if (!review) throw new NotFoundException('Review bulunamadı');

    Object.assign(review, updateReviewDto);
    return this.reviewsRepository.save(review);
  }

  async delete(id: number, userId: number) {
    const review = await this.reviewsRepository.findOne({
      where: { id, user: { id: userId } },
    });
    if (!review) {
      throw new NotFoundException('Review not found');
    }

    return this.reviewsRepository.delete(id);
  }
}
