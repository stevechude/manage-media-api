import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { CreateMediaDto, EditMediaDto } from './dto';
import { MediaService } from './media.service';

@UseGuards(JwtGuard)
@Controller('media')
export class MediaController {
  constructor(private media: MediaService) {}
  @Post('create')
  createMedia(@GetUser('id') userId: number, @Body() dto: CreateMediaDto) {
    return this.media.createMedia(userId, dto);
  }

  @Get('get')
  getMedias(@GetUser('id') userId: number) {
    return this.media.getMedias(userId);
  }

  @Get('get/:id')
  getMediaById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) mediaId: number,
  ) {
    return this.media.getMediaById(userId, mediaId);
  }

  @Get('search')
  getMediasByNameAndDescription(
    @GetUser('id') userId: number,
    @Query('query') query: string,
  ) {
    return this.media.getMediasByNameAndDescription(userId, query);
  }

  @Patch('edit/:id')
  editMediaById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) mediaId: number,
    @Body() dto: EditMediaDto,
  ) {
    return this.media.editMediaById(userId, mediaId, dto);
  }

  @Delete('delete/:id')
  softDeleteMediaById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) mediaId: number,
  ) {
    return this.media.softDeleteMediaById(userId, mediaId);
  }
}
