import { BadRequestException, Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/CreateBlog.dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('blogs')
export class BlogsController {

    constructor(private blogService: BlogsService) { }

    // This route is open to everyone who wants to read blog posts :)
    @Get()
    async listAllBlogs() {
        try {
            return await this.blogService.listAllBlogs()
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':id')
    async getBlog(@Param('id') id: string) {
        try {
            return await this.blogService.getBlog(id)
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new HttpException(error.message, HttpStatus.NOT_FOUND);
            } else if (error instanceof BadRequestException) {
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            } else {
                throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    // @UseGuards(JwtGuard)
    @Post(':user_id')
    async createBlog(@Param('user_id') user_id, @Body() data: CreateBlogDto) {
        try {
            return await this.blogService.createBlog(user_id, data)
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            } else {
                throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    @Patch(':id')
    async updateBlog(@Param('id') id: string, @Body() data: CreateBlogDto) {
        try {
            return await this.blogService.updateBlog(id, data)
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new HttpException(error.message, HttpStatus.NOT_FOUND);
            } else if (error instanceof BadRequestException) {
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            } else {
                throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    @Delete(':id')
    async deleteBlog(@Param('id') id: string) {        
        try {
            await this.blogService.deleteBlog(id)
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new HttpException(error.message, HttpStatus.NOT_FOUND);
            } else {
                throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
}
