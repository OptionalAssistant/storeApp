import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/usermodule/users.module';
import { Product } from './entities/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { FileModule } from 'src/filemodule/file.module';

@Module({
    imports:[TypeOrmModule.forFeature([Product]),UsersModule,JwtModule,FileModule],
    controllers:[ProductController],
    providers:[ProductService]
})
export class ProductModule {
}
