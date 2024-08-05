import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubCategorySchema } from 'src/database/schemas/subcategory.schema';
import { SubcategoryController } from 'src/subcategory/restapi/subcategory.controller';
import { SubcategoryService } from 'src/subcategory/restapi/subcategory.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'SubCategory', schema: SubCategorySchema },
    ]),
  ],
  controllers: [SubcategoryController],
  providers: [SubcategoryService],
})
export class SubcategoryModule {}
