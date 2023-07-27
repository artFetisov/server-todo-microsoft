import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Category } from "./category.model";
import { CreateCategoryDto } from "./dto/create-category-dto";

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category) private categoryRepository: typeof Category,
  ) {}

  async getAll(userId: number) {
    return this.categoryRepository.findAll({ where: { userId } });
  }

  async getCategoryById(categoryId: number) {
    return this.categoryRepository.findOne({ rejectOnEmpty: undefined, where: { id: categoryId } });
  }

  async createCategory({ title }: CreateCategoryDto, userId: number) {
    const category = await this.categoryRepository.create({ title, userId });

    if (!category) {
      throw new HttpException("Список не найден", HttpStatus.NOT_FOUND);
    }
    return category;
  }

  async updateCategory(id: number, dto: CreateCategoryDto) {
    const category = await this.categoryRepository.findOne({ rejectOnEmpty: undefined, where: { id } });

    if (!category) {
      throw new HttpException("Список не найден", HttpStatus.NOT_FOUND);
    }
    await category.update({ title: dto.title });

    return category;
  }

  async deleteCategory(id: number) {
    const category = await this.categoryRepository.findOne({ rejectOnEmpty: undefined, where: { id } });

    if (!category) {
      throw new HttpException("Список не найден", HttpStatus.NOT_FOUND);
    }

    await category.destroy();

    return category;
  }
}
