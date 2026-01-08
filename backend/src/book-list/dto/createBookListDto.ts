import { IsString, IsNotEmpty } from 'class-validator';

export class CreateBookListDto {
  @IsString()
  @IsNotEmpty()
  title: string;
}
