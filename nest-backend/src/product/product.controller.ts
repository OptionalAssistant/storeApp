import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/authmodule/auth.guard';
import { Role } from 'src/authmodule/roles/role.enum';
import { Roles } from 'src/authmodule/roles/roles.decorator';
import { RolesGuard } from 'src/authmodule/roles/roles.guard';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { getFileUploadInterceptor } from 'src/utils/file-upload.utils';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts(): Promise<Product[]> {
    return await this.productService.getProducts();
  }

  @Roles(Role.Admin)
  // @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(getFileUploadInterceptor('file'))
  @Post('create')
  async createProduct(
    @Body() product: Product,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.productService.createProduct(product, file);
  }

  @Roles(Role.Admin)
   @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  async deleteProduct(@Param('id') id: number) {
    return await this.productService.deleteProduct(id);
  }

  @Roles(Role.Admin)
   @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(getFileUploadInterceptor('file'))
  @Patch(':id')
  async editProduct(
    @Param('id') id: number,
    @Body() product: Product,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.productService.updateProduct(id, product,file);
  }
}
