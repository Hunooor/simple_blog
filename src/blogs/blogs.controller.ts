import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/CreateBlog.dto';

@Controller('blogs')
export class BlogsController {

    constructor(private blogService: BlogsService) {}

    @Get()
    getAllBlog() {
        return this.blogService.getAllBlogs()
    }

    @Get(':id')
    getBlogById(@Param('id') id: string) {
        return this.blogService.getBlogById(id)
    }

    @Post(':user_id')
    async createNewBlogPost(@Param('user_id') user_id: string, @Body() data: CreateBlogDto) {
        return await this.blogService.createBlog(user_id, data)
    }

    @Patch(':id')
    async updateBlog(@Param('id') id: string, @Body() data: CreateBlogDto) {
        await this.blogService.updateBlog(id, data)
    }

    @Delete(':id')
    async deleteBlog(@Param('id') id: string) {
        await this.blogService.deleteBlog(id)
    }
}
