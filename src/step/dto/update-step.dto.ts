import { IsBoolean, IsString } from "class-validator";

export class UpdateStepDto {
  @IsString()
  readonly title: string;

  @IsBoolean()
  readonly completed: boolean;
}