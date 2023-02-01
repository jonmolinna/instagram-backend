import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UsePipes,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { FileSizeValidationPipe } from './validateFile';

@Controller('post')
export class PostController {
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(FileSizeValidationPipe)
  async createPost(@UploadedFile() file: Express.Multer.File) {
    console.log('YOOOOOO', file);
  }
}
