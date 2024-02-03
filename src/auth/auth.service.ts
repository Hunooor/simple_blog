import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from 'src/users/dto/LoginUser.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,
        private jwtService: JwtService
    ){}

    async validateUser(username: string, password: string) {
        const user = await this.userService.findUserByUsername(username);

        if (user && await bcrypt.compare(password, user.password)) {
            const {password, ...result} = user
            return result;
        }

        return null;
    }

    async login(loginUserDto: LoginUserDto) {
        const payload = {
            userName: loginUserDto.userName
        }

        return {
            accesToken: this.jwtService.sign(payload),
        }

    }

}