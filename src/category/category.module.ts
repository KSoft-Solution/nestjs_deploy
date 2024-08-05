import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CategoryController } from 'src/category/restapi/category.controller';
import { CategoryService } from 'src/category/restapi/category.service';
import { CategorySchema } from 'src/database/schemas/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
   
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
