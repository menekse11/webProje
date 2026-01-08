import {
  IsBoolean,
  IsInt,
  Min,
  Max,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateReviewDto {
  @IsBoolean()
  isRead: boolean;

  @IsInt()
  @Min(1)
  @Max(10)
  rating?: number;

  @IsString()
  @MaxLength(500)
  comment?: string;
}
