// src/product/entities/product.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column()
  imageUrl: string;
  
}