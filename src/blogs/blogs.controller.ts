import { BadRequestException, Body, Controller, Delete, ForbiddenException, Get, HttpException, HttpStatus, NotFoundException, Param, Patch, Post, Req, Request, UseGuards } from '@nestjs/common';
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

    @UseGuards(JwtGuard)
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

    @UseGuards(JwtGuard)
    @Post()
    async createBlog(@Request() req, @Body() data: CreateBlogDto) {
        try {
            return await this.blogService.createBlog(req, data)
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            } else {
                throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    @UseGuards(JwtGuard)
    @Patch(':id')
    async updateBlog(@Request() req, @Param('id') id: string, @Body() data: CreateBlogDto) {
        try {
            return await this.blogService.updateBlog(req, id, data)
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new HttpException(error.message, HttpStatus.NOT_FOUND);
            } else if (error instanceof ForbiddenException) {
                throw new HttpException(error.message, HttpStatus.FORBIDDEN);
            } else if (error instanceof BadRequestException) {
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            } else {
                throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    @UseGuards(JwtGuard)
    @Delete(':id')
    async deleteBlog(@Request() req, @Param('id') id: string) {
        try {
            await this.blogService.deleteBlog(req, id)
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new HttpException(error.message, HttpStatus.NOT_FOUND);
            } else if (error instanceof ForbiddenException) {
                throw new HttpException(error.message, HttpStatus.FORBIDDEN);
            } else {
                throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
}
