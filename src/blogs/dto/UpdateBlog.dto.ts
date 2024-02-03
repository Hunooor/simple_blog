import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateBlogDto {
    
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    content: string;
    
}