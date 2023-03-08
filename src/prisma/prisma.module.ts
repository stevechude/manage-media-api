import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// the @Global() decorator allows any exports from this module
// to be accessible everywhere.
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
