import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductSchema } from 'src/database/schemas/product.shema';
import { ProductController } from 'src/product/restapi/product.controller';
import { ProductService } from 'src/product/restapi/product.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
