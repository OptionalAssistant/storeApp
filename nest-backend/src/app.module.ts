import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'; // Import TypeOrmModuleOptions
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './authmodule/auth.module';
import { Product } from './product/entities/product.entity';
import { ProductModule } from './product/product.module';
import { User } from './usermodule/entities/user.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { StripeModule } from './stripemodule/stripe.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    ConfigModule.forRoot({ isGlobal: true }), 
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], 
      inject: [ConfigService], 
      useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => ({ 
        type: 'postgres', 
        username: configService.getOrThrow('DB_USERNAME'),
        password: configService.getOrThrow('DB_PASSWORD'),
        database: configService.getOrThrow('DB_DATABASE'),
        synchronize: true,
        entities: [Product, User],
      }),
    }),
    ProductModule,
    AuthModule,
    StripeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}