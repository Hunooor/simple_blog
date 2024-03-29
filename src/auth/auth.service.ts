import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from './dto/AuthCredentials.dto';
import { User } from 'src/schemas/User.schema';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, password: string) {
        const user = await this.userService.findUserByUserName(username);

        if (user && (await bcrypt.compare(password, user.password))) {
            const { password, ...result } = user;
            return result;
        }

        return null;
    }

    async login(authCredentials: AuthCredentialsDto) {
        const payload = {
            username: authCredentials.username
        };

        return {
            username: authCredentials.username,
            accesToken: this.jwtService.sign(payload),
            refreshToken: this.jwtService.sign(payload, { expiresIn: '2d' })
        };

    }

    async refreshToken(user: User) {
        const payload = {
            username: user.username
        };

        return {
            accesToken: this.jwtService.sign(payload),
        };

    }

}
