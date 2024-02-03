import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local-strategy';

@Module({
  providers: [AuthService, UsersService, JwtService, LocalStrategy],
  controllers: [AuthController],
  imports:[JwtModule.register({
    secret: process.env.jwt_secret,
    signOptions: {expiresIn: '30m'}
  })]
})
export class AuthModule {}
