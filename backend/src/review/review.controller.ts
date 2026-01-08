import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
  Request,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/createReviewDto';
import { UpdateReviewDto } from './dto/updateReviewDto';
import { AuthGuard } from '@nestjs/passport';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  listAll(@Request() req) {
    return this.reviewService.listAll(req.user.id);
  }
  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  show(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.reviewService.getOne(id, req.user.id);
  }
  @Get('book/:bookId')
  @UseGuards(AuthGuard('jwt'))
  getByBook(@Param('bookId', ParseIntPipe) bookId: number, @Request() req) {
    return this.reviewService.getByBook(bookId, req.user.id);
  }

  @Post('book/:bookId')
  @UseGuards(AuthGuard('jwt'))
  create(
    @Param('bookId', ParseIntPipe) bookId: number,
    @Body(ValidationPipe) dto: CreateReviewDto,
    @Request() req,
  ) {
    return this.reviewService.create(bookId, dto, req.user.id);
  }
  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body(ValidationPipe) updateRewiew: UpdateReviewDto,
    @Request() req,
  ) {
    return this.reviewService.update(+id, updateRewiew, req.user.id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  delete(@Param('id', ParseIntPipe) id: string, @Request() req) {
    return this.reviewService.delete(+id, req.user.id);
  }
}
