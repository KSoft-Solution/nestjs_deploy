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
  
  import { Product } from 'src/product/restapi/interface/product.types';
  import { CreateProductDTO, UpdateProductDTO } from 'src/product/restapi/dto/product.dto';
  import { ProductService } from 'src/product/restapi/product.service';
import { ApiTags } from '@nestjs/swagger';

  @Controller('/product')
  @ApiTags('Product')
  export class ProductController {
    constructor(private productService: ProductService) {}
  
    @Post('/create')
    async create(
      @Res() res,
      @Body() createProductDTO: CreateProductDTO,
    ): Promise<Product> {
      try {
        const product = await this.productService.createProduct(createProductDTO);
        return res.json({
          message: 'Product created successfully',
          product,
        });
      } catch (error) {
        throw new Error(error);
      }
    }
  
    @Get('/get_all_products')
    async findAll(@Res() res): Promise<Product[]> {
      try {
        const products = await this.productService.findAll();
        return res.json({
          message: 'Products obtained successfully',
          products,
        });
      } catch (error) {
        throw new Error(error);
      }
    }
  
    @Get(':productID')
    async findById(
      @Res() res,
      @Param('productID') productID: string,
    ): Promise<Product> {
      try {
        const product = await this.productService.findById(productID);
        return res.json({
          message: 'Product obtained successfully',
          product,
        });
      } catch (error) {
        throw new Error(error);
      }
    }
  
    @Put(':productID')
    async update(
      @Res() res,
      @Param('productID') productID: string,
      @Body() updateProductDTO: UpdateProductDTO,
    ): Promise<Product> {
      try {
        const product = await this.productService.updateProduct(
          productID,
          updateProductDTO,
        );
        return res.json({
          message: 'Product update successfully',
          product,
        });
      } catch (error) {
        throw new Error(error);
      }
    }
  
    @Delete(':productID')
    async delete(
      @Res() res,
      @Param('productID') productID: string,
    ): Promise<Product> {
      try {
        const product = await this.productService.deleteProduct(productID);
        return res.json({
          message: 'Product removed successfully',
          product,
        });
      } catch (error) {
        throw new Error(error);
      }
    }
  }
  