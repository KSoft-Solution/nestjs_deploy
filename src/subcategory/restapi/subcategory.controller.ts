import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateSubCategoryDTO,
  UpdateSubCategoryDTO,
} from 'src/subcategory/restapi/dto/subcategory.dto';
import { SubCategory } from 'src/subcategory/restapi/interface/subcategory.types';
import { SubcategoryService } from 'src/subcategory/restapi/subcategory.service';

@Controller('/subCategory')
@ApiTags('SubCategory')
export class SubcategoryController {
  constructor(private subCategoryService: SubcategoryService) {}

  @Post('/create')
  async create(
    @Res() res,
    @Body() createSubCategoryDTO: CreateSubCategoryDTO,
  ): Promise<SubCategory> {
    try {
      const subCategory =
        await this.subCategoryService.createSubCategory(createSubCategoryDTO);
      return res.json({
        message: 'Sub Category created successfully',
        subCategory,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get('/get_all_subCategories')
  async findAll(@Res() res): Promise<SubCategory[]> {
    try {
      const subCategory = await this.subCategoryService.findAll();
      return res.json({
        message: 'Sub Categories obtained successfully',
        subCategory,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get(':subCategoryID')
  async findById(
    @Res() res,
    @Param('subCategoryID') subCategoryID: string,
  ): Promise<SubCategory> {
    try {
      const subCategory = await this.subCategoryService.findById(subCategoryID);
      return res.json({
        message: 'SubCategory obtained successfully',
        subCategory,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  @Put(':subCategoryID')
  async update(
    @Res() res,
    @Param('subCategoryID') subCategoryID: string,
    @Body() updateSubCategoryDTO: UpdateSubCategoryDTO,
  ): Promise<SubCategory> {
    try {
      const subCategory = await this.subCategoryService.updateSubCategory(
        subCategoryID,
        updateSubCategoryDTO,
      );
      return res.json({
        message: 'SubCategory update successfully',
        subCategory,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  @Delete(':subCategoryID')
  async delete(
    @Res() res,
    @Param('subCategoryID') subCategoryID: string,
  ): Promise<SubCategory> {
    try {
      const subCategory =
        await this.subCategoryService.deleteSubCategory(subCategoryID);
      return res.json({
        message: 'SubCategory removed successfully',
        subCategory,
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
