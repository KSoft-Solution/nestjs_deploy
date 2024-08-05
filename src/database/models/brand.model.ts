import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { Brand } from 'src/brand/restapi/interface/brand.interface';
import { CreateBrandDTO } from 'src/brand/restapi/dto/brand.dto';

@Injectable()
export class BrandModel {
  constructor(
    @InjectModel('Brand') private readonly brandModel: Model<Brand>,
  ) {}

  async findBrandById(id: string): Promise<{ name: string }> {
    return await this.brandModel.findById(id).select('name -_id').lean();
  }
  async create(brandDetail: CreateBrandDTO): Promise<Brand> {
    return await this.brandModel.create(brandDetail);
  }

  async findAllBrands(): Promise<any> {
    return await this.brandModel.find();
  }

  async updateBrandById(
    Id: string,
    body: { name: string },
  ): Promise<{ name: string }> {
    await this.brandModel.findByIdAndUpdate(Id, body);

    return { name: body.name };
  }
}
