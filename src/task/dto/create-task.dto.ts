import { IsNumber, IsString } from "class-validator";

export class CreateTaskDto {
  @IsString({ message: "Оглавление задачи должно быть строкой" })
  readonly title: string;

  @IsNumber()
  categoryId: number;
}