import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local-strategy';
import { UsersService } from 'src/users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from 'src/schemas/User.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{
        name: User.name,
        schema: userSchema
    }]),
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}`,
      signOptions: {expiresIn: '30m'}
    })
  ],
  providers: [AuthService, LocalStrategy, UsersService],
  controllers: [AuthController]  
})
export class AuthModule {}
