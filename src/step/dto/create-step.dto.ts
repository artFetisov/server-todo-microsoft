import { IsNumber, IsString } from "class-validator";

export class CreateStepDto {
  @IsString({ message: "Оглавление задачи должно быть строкой" })
  readonly title: string;

  @IsNumber()
  taskId: number;
}
