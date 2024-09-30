import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   // Define CORS options
   const corsOptions: CorsOptions = {
    origin: 'http://localhost:3000', // Adjust according to your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable set cookie
  };

  app.enableCors(corsOptions); // Enable CORS with the specified options
  
  await app.listen(4444);
}
bootstrap();
