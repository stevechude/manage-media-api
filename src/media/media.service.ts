import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMediaDto, EditMediaDto } from './dto';

@Injectable()
export class MediaService {
  constructor(private prisma: PrismaService) {}

  async createMedia(userId: number, dto: CreateMediaDto) {
    const media = await this.prisma.media.create({
      data: {
        userId,
        ...dto,
      },
    });
    return media;
  }

  getMedias(userId: number) {
    return this.prisma.media.findMany({
      where: {
        userId,
      },
    });
  }

  getMediaById(userId: number, mediaId: number) {
    return this.prisma.media.findFirst({
      where: {
        id: mediaId,
        userId,
      },
    });
  }

  getMediasByNameAndDescription(userId: number, query: string) {
    return this.prisma.media.findMany({
      where: {
        userId,
        OR: [
          { name: { contains: query } },
          { description: { contains: query } },
        ],
      },
    });
  }

  async editMediaById(userId: number, mediaId: number, dto: EditMediaDto) {
    // Get the media by id
    const media = await this.prisma.media.findUnique({
      where: {
        id: mediaId,
      },
    });

    // check if user owns the media
    if (!media || media.userId !== userId) {
      throw new ForbiddenException('Access to this media is denied');
    }

    return this.prisma.media.update({
      where: {
        id: mediaId,
      },
      data: {
        ...dto,
      },
    });
  }

  async softDeleteMediaById(
    userId: number,
    mediaId: number,
    // dto: DeleteMediaDto,
  ) {
    // Get the media by id
    const media = await this.prisma.media.findUnique({
      where: {
        id: mediaId,
      },
    });

    // check if user owns the media to delete
    if (!media || media.userId !== userId) {
      throw new ForbiddenException('Access to this media is denied');
    }

    return this.prisma.media.update({
      where: {
        id: mediaId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
