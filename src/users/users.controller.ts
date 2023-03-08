import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
// import { Request } from 'express';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  @Get('me')
  getUser(@GetUser() user: User) {
    return user;
  }
}
