import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { Book } from 'src/books/books.entity';
import { User } from 'src/users/users.entity';

@Entity()
export class BookList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToMany(() => Book, (book) => book.booklists, { onDelete: 'CASCADE' })
  @JoinTable()
  books: Book[];

  @ManyToOne(() => User, (user) => user.booklists, { onDelete: 'CASCADE' })
  user: User;
}
