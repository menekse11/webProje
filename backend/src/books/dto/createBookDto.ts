import { IsNotEmpty, IsString, IsUrl, IsOptional } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsUrl({})
  @IsOptional()
  cover_image?: string;
}
