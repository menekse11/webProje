import { BookList } from 'src/book-list/book-list.entity';
import { Review } from 'src/review/review.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ default: 'user' })
  role: string;
  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToMany(() => BookList, (booklist) => booklist.user)
  booklists: BookList[];
}
