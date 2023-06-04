import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-users.dto";
import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";

@Controller("/users")
export class UsersController {
  constructor(private userService: UsersService) {
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }
}
