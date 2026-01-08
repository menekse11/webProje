import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { BookList } from 'src/book-list/book-list.entity';
import { Review } from 'src/review/review.entity';
import { User } from './users.entity';
import { CreateUserDto } from './dto/createUserDto';
import { UpdateUserDto } from './dto/updateUserDto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Review) private reviewsRepository: Repository<Review>,
    @InjectRepository(BookList)
    private booklistsRepository: Repository<BookList>,
  ) {}

  async getMe(userId: number) {
    return this.usersRepository.findOne({
      where: { id: userId },
      select: ['id', 'firstName', 'lastName', 'username', 'email', 'role'],
    });
  }

  async listAll() {
    return this.usersRepository.find();
  }

  getOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  async create(createUser: CreateUserDto) {
    const user = this.usersRepository.create(createUser);
    return this.usersRepository.save(user);
  }
  async update(id: number, updateUser: UpdateUserDto) {
    const user = await this.getOne(id);
    if (!user) throw new NotFoundException();
    Object.assign(user, updateUser);
    return this.usersRepository.save(user);
  }
  async delete(id: number) {
    return this.usersRepository.delete(id);
  }
}
