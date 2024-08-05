import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// import { SharedModule } from 'src/shared/shared.module';
import { BrandController } from 'src/brand/restapi/brand.controller';
import { BrandService } from 'src/brand/restapi/brand.service';
import { BrandModel } from 'src/database/models/brand.model';
import { BrandSchema } from 'src/database/schemas/brand.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Brand', schema: BrandSchema }]),
    // SharedModule,
  ],
  controllers: [BrandController],
  providers: [BrandService, BrandModel],
})
export class BrandModule {}
