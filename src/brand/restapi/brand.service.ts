import { HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from 'express';
import { Model } from 'mongoose';
import {
  CreateBrandDTO,
  UpdateBrandDTO,
} from 'src/brand/restapi/dto/brand.dto';
import { Brand } from 'src/brand/restapi/interface/brand.interface';

@Injectable()
@Injectable()
export class BrandService {
  constructor(@InjectModel('Brand') private brandModel: Model<Brand>) {}

  async findAll(): Promise<Brand[]> {
    try {
      return await this.brandModel.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  async findById(id: string): Promise<Brand> {
    try {
      const brand = await this.brandModel.findById(id);

      if (!brand) {
        throw new HttpException('Brand not found', HttpStatus.NO_CONTENT);
      }

      return brand;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createBrand(createBrandDTO: CreateBrandDTO): Promise<Brand> {
    try {
      const brand = await this.brandModel.create(createBrandDTO);
      return await brand.save();
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateBrand(
    brandID: string,
    updateBrandDTO: UpdateBrandDTO,
  ): Promise<Brand> {
    try {
      const brand = await this.brandModel.findByIdAndUpdate(
        brandID,
        updateBrandDTO,
        { new: true },
      );

      return brand;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteBrand(brandID: string): Promise<Brand> {
    try {
      const brand = await this.brandModel.findByIdAndUpdate(brandID, {
        state: false,
      });

      return brand;
    } catch (error) {
      throw new Error(error);
    }
  }
}
