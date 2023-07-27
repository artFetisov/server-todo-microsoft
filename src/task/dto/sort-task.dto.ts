import { IsString } from "class-validator";

export class SortTaskDto {
  @IsString()
  readonly property: string;

  @IsString()
  readonly direction: "DESC" | "ASC";
}
