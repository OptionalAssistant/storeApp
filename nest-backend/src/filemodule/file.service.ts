import { Injectable, NotFoundException } from '@nestjs/common';
import { unlink } from 'fs';
import { promisify } from 'util';
import * as path from 'path';


const unlinkAsync = promisify(unlink);

@Injectable()
export class FileService{
    async deleteFile(imageUrl: string): Promise<void> {
        try {
          const filePath = path.resolve(__dirname, '../../uploads', imageUrl);

          await unlinkAsync(filePath);
          console.log('File deleted successfully');
        } catch (err) {
          throw new NotFoundException(`File not found: ${imageUrl}`);
        }
      }
}