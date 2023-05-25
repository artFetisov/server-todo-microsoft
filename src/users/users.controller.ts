import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-users.dto";
import { Body, Controller, Get, Post } from "@nestjs/common";

@Controller("/users")
export class UsersController {
  constructor(private userService: UsersService) {
  }

  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }



}
