import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local-strategy';
import { UsersService } from 'src/users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from 'src/schemas/User.schema';
import { JwtStrategy } from './strategies/jwt-strategy';

@Module({
  imports:[
    MongooseModule.forFeature([{
        name: User.name,
        schema: userSchema
    }]),
    JwtModule.register({
      //secret: `${process.env.JWT_SECRET}`,
      secret: "verysecretkey56789",
      signOptions: {expiresIn: "3600s"}
    })
  ],
  providers: [
    AuthService, 
    LocalStrategy, 
    UsersService, 
    JwtStrategy
  ],
  controllers: [AuthController]  
})
export class AuthModule {}
