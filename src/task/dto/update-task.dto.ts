import { IsBoolean, IsDate, IsNumber, IsString } from "class-validator";
import { IsNull } from "sequelize-typescript";

export class UpdateTaskDto {
  @IsString()
  readonly title: string;

  @IsBoolean()
  readonly completed: boolean;

  @IsBoolean()
  readonly priority: boolean;

  readonly completionDate: Date;

  @IsNumber()
  readonly categoryId: number;
}
