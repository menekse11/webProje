import { PartialType } from '@nestjs/mapped-types';
import { CreateBookListDto } from './createBookListDto';

export class UpdateBookListDto extends PartialType(CreateBookListDto) {}
