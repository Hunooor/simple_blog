import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    authorName: string;

}