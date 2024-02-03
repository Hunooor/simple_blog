import { Module } from '@nestjs/common';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Blog, blogSchema } from 'src/schemas/Blog.schema';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { User, userSchema } from 'src/schemas/User.schema';
import { UsersService } from 'src/users/users.service';

@Module({
    imports:[MongooseModule.forFeature([
        {
            name: Blog.name,
            schema: blogSchema
        },
        {
            name: User.name,
            schema: userSchema
        }
    ])],
    providers:[BlogsService, UsersService ],
    controllers: [BlogsController]
})
export class BlogsModule {}
