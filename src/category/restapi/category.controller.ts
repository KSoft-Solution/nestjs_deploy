import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CategoryService } from 'src/category/restapi/category.service';
import {
    CreateCategoryDTO,
    UpdateCategoryDTO
} from 'src/category/restapi/dto/category.dto';
import { Category } from 'src/category/restapi/interface/category.interface';

@Controller('/category')
@ApiTags('Category')
export class CategoryController {
    constructor(private categoryService: CategoryService) { }

    @Post('/create')
    async create(
        @Res() res,
        @Body() createCategoryDTO: CreateCategoryDTO,
    ): Promise<Category> {
        try {
            const category = await this.categoryService.createCategory(createCategoryDTO);
            return res.json({
                message: 'Category created successfully',
                category,
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    @Get('/get_all_categories')
    async findAll(@Res() res): Promise<Category[]> {
        try {
            const category = await this.categoryService.findAll();
            return res.json({
                message: 'Category obtained successfully',
                category,
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    @Get(':categoryID')
    async findById(
        @Res() res,
        @Param('categoryID') categoryID: string,
    ): Promise<Category> {
        try {
            const category = await this.categoryService.findById(categoryID);
            return res.json({
                message: 'Category obtained successfully',
                category,
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    @Put(':categoryID')
    async update(
        @Res() res,
        @Param('categoryID') categoryID: string,
        @Body() updateCategoryDTO: UpdateCategoryDTO,
    ): Promise<Category> {
        try {
            const category = await this.categoryService.updateCategory(
                categoryID,
                updateCategoryDTO,
            );
            return res.json({
                message: 'Category update successfully',
                category,
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    @Delete(':categoryID')
    async delete(@Res() res, @Param('categoryID') categoryID: string): Promise<Category> {
        try {
            const category = await this.categoryService.deleteCategory(categoryID);
            return res.json({
                message: 'Category removed successfully',
                category,
            });
        } catch (error) {
            throw new Error(error);
        }
    }
}
