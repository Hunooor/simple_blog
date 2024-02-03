import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Blog } from 'src/schemas/Blog.schema';
import { CreateBlogDto } from './dto/CreateBlog.dto';

@Injectable()
export class BlogsService {
    constructor(
        @InjectModel(Blog.name) private blogModel: Model<Blog>
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

            return blog
        } catch (error) {
            throw error;
        }

    }

    // create a new blog post using the request user
    async createBlog(user_id: string, data: CreateBlogDto) {
        try {
            const newBlog = new this.blogModel({
                ...data, user: user_id
            });

            await newBlog.save();

            return await this.getBlog(newBlog.id);
        } catch (error) {
            throw error;
        }

    }

    // update az existing blog post using the request user
    async updateBlog(id: string, data: CreateBlogDto) {
        try {
            if (!mongoose.Types.ObjectId.isValid(id))
                throw new BadRequestException("Invalid _id value");

            const updatedBlog = await this.blogModel.findByIdAndUpdate(id, data);

            if (!updatedBlog) throw new NotFoundException("The blog not found");
            return await this.getBlog(updatedBlog.id);
        } catch (error) {
            throw error;
        }

    }

    // delete a blog post if exists
    async deleteBlog(id: string) {
        try {
            if (!mongoose.Types.ObjectId.isValid(id))
                throw new BadRequestException("Invalid _id value");

            const result = await this.blogModel.findByIdAndDelete(id);

            if (!result)
                throw new NotFoundException("The blog not found");
        } catch (error) {
            throw error;
        }
    }

}