import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
  @IsEmail({}, { message: "Некорректный email" })
  @IsString({ message: "Должно быть строкой" })
  readonly email: string;

  @IsString({ message: "Должно быть строкой" })
  @Length(6, 16, { message: "Не меньше 4 и не больше 16 символов" })
  readonly password: string;
}
