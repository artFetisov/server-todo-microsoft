import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category-dto";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { UserData } from "../users/decorators/user-data.decorator";
import { User } from "../users/users.model";

@Controller("/categories")
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(@UserData() { id }: Pick<User, "id">) {
    return this.categoryService.getAll(id);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() dto: CreateCategoryDto, @UserData() { id }: Pick<User, "id">) {
    return this.categoryService.createCategory(dto, id);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Put(":id")
  update(@Param("id") id: number, @Body() dto: CreateCategoryDto) {
    return this.categoryService.updateCategory(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Delete(":id")
  delete(@Param("id") id: number) {
    return this.categoryService.deleteCategory(id);
  }
}
