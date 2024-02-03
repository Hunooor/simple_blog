import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { CreateUserDto } from './dto/CreateUser.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    // register a new user
    async createUser(createUserDto: CreateUserDto) {
        try {
            const user = await this.userModel.findOne({ "username": createUserDto.username })

            if (user) {
                throw new BadRequestException('The username is already taken')
            }

            await new this.userModel(createUserDto).save();
        } catch (error) {
            throw error
        }

    }
    

    // find user by id
    async findUserByUserName(username: string) {
        try {
            return await this.userModel.findOne({ username: username });
        } catch (error) {
            throw error
        }
    }
}
