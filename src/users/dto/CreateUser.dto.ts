import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    
    @IsNotEmpty()
    @IsString()
    userName: string;

    @IsNotEmpty()
    @IsString()
    authorName: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}