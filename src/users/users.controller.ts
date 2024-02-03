import { BadRequestException, Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUser.dto';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }

    //the user registration is open 
    @Post('register')
    async createUser(@Body() body: CreateUserDto) {
        try {
            return await this.userService.createUser(body);
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            } else {
                throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
}

