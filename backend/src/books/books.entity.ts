import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Review } from 'src/review/review.entity';
import { BookList } from 'src/book-list/book-list.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column({ nullable: true })
  cover_image: string;

  @OneToMany(() => Review, (review) => review.book)
  reviews: Review[];

  @ManyToMany(() => BookList, (booklist) => booklist.books)
  booklists: BookList[];
}
