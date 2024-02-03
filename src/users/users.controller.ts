import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUser.dto';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService){}

    // user registration
    @Post()
    async createUser(@Body() body: CreateUserDto): Promise<any> {
        return await this.userService.createUser(body);
    }
}
