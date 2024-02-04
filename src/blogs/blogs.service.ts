import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Blog } from 'src/schemas/Blog.schema';
import { CreateBlogDto } from './dto/CreateBlog.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class BlogsService {
    constructor(
        @InjectModel(Blog.name) private blogModel: Model<Blog>,
        private userService: UsersService
    ) { }

    // return all blog post
    async listAllBlogs() {
        try {
            return await this.blogModel.find().sort('-updatedAt').populate('user', 'authorname -_id');
        } catch (error) {
            throw error;
        }
    }

    // get blog by id parameter
    async getBlog(id: string) {
        try {
            if (!mongoose.Types.ObjectId.isValid(id))
                throw new BadRequestException("Invalid _id value");

            const blog = await this.blogModel.findById(id).populate('user', 'authorname');

            if (!blog) throw new NotFoundException("The blog not found");

            return blog;
        } catch (error) {
            throw error;
        }

    }

    // create a new blog post using the request user
    async createBlog(request: any, data: CreateBlogDto) {
        try {
            const user = await this.userService.findUserByUserName(request.user.username);

            const newBlog = new this.blogModel({
                ...data, user: user.id
            });

            await newBlog.save();

            return await this.getBlog(newBlog.id);
        } catch (error) {
            throw error;
        }

    }

    // update az existing blog post using the request user
    async updateBlog(request: any, id: string, data: CreateBlogDto) {
        try {
            if (!mongoose.Types.ObjectId.isValid(id))
                throw new BadRequestException("Invalid _id value");

            await this.checkUserPermissionToModifyBlog(request.user.username, id);

            const updatedBlog = await this.blogModel.findByIdAndUpdate(id, data);

            return await this.getBlog(updatedBlog.id);
        } catch (error) {
            throw error;
        }

    }

    // delete a blog post if exists
    async deleteBlog(request: any, id: string) {
        try {
            if (!mongoose.Types.ObjectId.isValid(id))
                throw new BadRequestException("Invalid _id value");

            await this.checkUserPermissionToModifyBlog(request.user.username, id);

            const result = await this.blogModel.findByIdAndDelete(id);

            if (!result)
                throw new NotFoundException("The blog not found");
        } catch (error) {
            throw error;
        }
    }

    async checkUserPermissionToModifyBlog(username: string, blog_id: string) {
        const blog = await this.blogModel.findById(blog_id).populate('user');
        if (!blog) throw new NotFoundException("The blog not found");
        if (blog.user.username !== username) throw new ForbiddenException("No permission to modify this blog");
    }

}