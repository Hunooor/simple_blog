import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { CreateUserDto } from './dto/CreateUser.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>){}

    async createUser(createUserDto: CreateUserDto) {
        const user = await this.userModel.findOne({"userName": createUserDto.userName})

        if (user) {
            throw new HttpException('The username is already taken',  HttpStatus.UNPROCESSABLE_ENTITY)
        }

        return await new this.userModel(createUserDto).save();      
    }

    async findUserByUsername(userName: string) {
        return await this.userModel.findOne({userName: userName});
    }
}
