import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto, LoginDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: AuthDto) {
    // generate the password hash
    const hash = await argon.hash(dto.password);

    // save the new user in the db
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
          firstName: dto.firstName,
          lastname: dto.lastName,
        },
      });

      // return the saved user an access token
      const token = this.signToken(user.id, user.email);
      return token;
      //   return {
      //     status: 'success',
      //     msg: 'user has been created.',
      //     token,
      //   };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials already taken!');
        }
      }
      return {
        status: 'error occured',
        msg: error.message,
      };
      //   throw error;
    }
  }

  async login(dto: LoginDto) {
    // find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    // if user doesn't exist, throw an exception
    if (!user) throw new ForbiddenException('Credentials incorrect');

    // compare passwords
    const pwCheck = await argon.verify(user.hash, dto.password);

    // if passwords don't match, throw an exception
    if (!pwCheck) throw new ForbiddenException('Credentials incorrect');

    // send back the user a access token.
    const token = this.signToken(user.id, user.email);
    return token;
    // return {
    //   status: 'success',
    //   msg: 'You are logged in.',
    //   token,
    // };
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret,
    });

    return {
      access_token: token,
    };
  }
}
