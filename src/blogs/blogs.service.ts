import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Blog } from 'src/schemas/Blog.schema';
import { CreateBlogDto } from './dto/CreateBlog.dto';

@Injectable()
export class BlogsService {
    constructor(
        @InjectModel(Blog.name) private blogModel: Model<Blog>
    ) {}
    
    getBlogById(id: string) {
        this.checkMongooseId(id)

        const blog = this.blogModel.findById(id).populate('user', 'authorName')
        if (!blog) 
            throw new HttpException("Blog not found", 404)
        return blog
        
    }


    createBlog(user_id: string, data: CreateBlogDto) {
        this.checkMongooseId(user_id)

        const newBlog = new this.blogModel({
            ...data, user: user_id
        });
        
        newBlog.save();

        return this.getBlogById(newBlog.id);

    }

    updateBlog(id: string, data: CreateBlogDto) {
        this.checkMongooseId(id)
        
        const updatedBlog = this.blogModel.findByIdAndUpdate(id, data, {new: true})
        console.log(updatedBlog)
        if (!updatedBlog)
            throw new HttpException("The blog not found", HttpStatus.NOT_FOUND) 
        
        return updatedBlog
    }

    deleteBlog(id: string) {
        this.checkMongooseId(id)
        return this.blogModel.findByIdAndDelete(id)
    }

    getAllBlogs() {
        return this.blogModel.find().populate('user', 'authorName')
    }

    checkMongooseId(id: string){
        if (!mongoose.Types.ObjectId.isValid(id)) 
            throw new HttpException("Invalid user id", HttpStatus.BAD_REQUEST) 
    }

}