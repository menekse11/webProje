import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  Unique,
} from 'typeorm';
import { Book } from 'src/books/books.entity';
import { User } from 'src/users/users.entity';
@Entity()
@Unique(['user', 'book'])
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  isRead: boolean;

  @Column({ type: 'int', nullable: true })
  rating: number | null;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @ManyToOne(() => User, (user) => user.reviews, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Book, (book) => book.reviews, { onDelete: 'CASCADE' })
  book: Book;
}
