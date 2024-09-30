import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateDateColumn } from 'typeorm';
import { Product } from './entities/product.entity';
import { FileService } from 'src/filemodule/file.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private readonly fileService : FileService
  ) {}

  async getProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async createProduct(product : Product,file : Express.Multer.File) : Promise<Product>{
    product.imageUrl = file.filename;
    console.log("Filename",file.filename);
    const newProduct =  this.productRepository.create(product);
    return this.productRepository.save(newProduct);
  }

  async deleteProduct(id: number){
    const product = await this.productRepository.findOne({where:{id : id}});

    if(!product){
      throw new Error(`Product with id:${id} not found`);
    }
    this.fileService.deleteFile(product.imageUrl);

    return  this.productRepository.delete(id);
  } 

  async updateProduct(id: number,updatedProduct :Product,file : Express.Multer.File) : Promise<Product>{
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    this.fileService.deleteFile(product.imageUrl);

    updatedProduct.imageUrl = file.filename;
    
    Object.assign(product, updatedProduct); 
    return this.productRepository.save(product); 
  } 
}
