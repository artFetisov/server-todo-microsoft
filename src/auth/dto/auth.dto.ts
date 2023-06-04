import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class AuthDto {
  @IsString({ message: "Email должен быть строкой" })
  @IsEmail({}, { message: "Некорректный email" })
  email: string;

  @MinLength(6, { message: "Пароль должен быть больше 6 символов" })
  @MaxLength(16, { message: "Пароль должен быть меньше 16 символов" })
  @IsString()
  password: string;
}