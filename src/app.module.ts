import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot("simple_blog_db://18.197.107.113:27017/")
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
