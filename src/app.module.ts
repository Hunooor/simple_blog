import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://18.197.107.113:27017/blogdb")
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
