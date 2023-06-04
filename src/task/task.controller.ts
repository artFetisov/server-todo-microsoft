import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { TaskService } from './task.service'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { Request } from 'express'
import { SortTaskDto } from './dto/sort-task.dto'
import { JwtAuthGuard } from "../auth/guards/jwt.guard";

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.taskService.getAll()
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Get('byTitle')
  searchByTitle(@Req() request: Request) {
    const title = request.query.title as string

    return this.taskService.searchByTitle(title)
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Get('sort/:categoryId')
  sort(@Param('categoryId') categoryId: number, @Query() query: SortTaskDto) {
    return this.taskService.sort(Number(categoryId), query.property, query.direction)
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Get(':id')
  getByCategory(@Param('id') categoryId: number) {
    return this.taskService.getByCategoryId(categoryId)
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() dto: CreateTaskDto) {
    return this.taskService.createTask(dto)
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Put(':id')
  updateTask(@Param('id') taskId: number, @Body() dto: UpdateTaskDto) {
    return this.taskService.updateTask(taskId, dto)
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Delete(':id')
  deleteTask(@Param('id') taskId: number) {
    return this.taskService.deleteTask(taskId)
  }
}
