import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category-dto";

@Controller("/categories")
export class CategoryController {
  constructor(private categoryService: CategoryService) {
  }

  @Get()
  getAll() {
    return this.categoryService.getAll();
  }

  @Post()
  create(@Body() dto: CreateCategoryDto) {
    return this.categoryService.createCategory(dto);
  }

  @Put(":id")
  update(@Param("id") id: number, @Body() dto: CreateCategoryDto) {
    return this.categoryService.updateCategory(id, dto);
  }

  @Delete(":id")
  delete(@Param("id") id: number) {
    return this.categoryService.deleteCategory(id);
  }
}