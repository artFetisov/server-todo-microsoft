import { IsString } from "class-validator";

export class CreateCategoryDto {
  @IsString({ message: "Оглавление списка должно быть строкой" })
  readonly title: string;
}