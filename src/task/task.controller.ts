import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from '@nestjs/common'
import { TaskService } from './task.service'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { Request } from 'express'
import { SortTaskDto } from './dto/sort-task.dto'

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  getAll() {
    return this.taskService.getAll()
  }

  @Get('byTitle')
  searchByTitle(@Req() request: Request) {
    const title = request.query.title as string

    return this.taskService.searchByTitle(title)
  }

  @Get('sort/:categoryId')
  sort(@Param('categoryId') categoryId: number, @Query() query: SortTaskDto) {
    return this.taskService.sort(Number(categoryId), query.property, query.direction)
  }

  @Get(':id')
  getByCategory(@Param('id') categoryId: number) {
    return this.taskService.getByCategoryId(categoryId)
  }

  @Post()
  create(@Body() dto: CreateTaskDto) {
    return this.taskService.createTask(dto)
  }

  @Put(':id')
  updateTask(@Param('id') taskId: number, @Body() dto: UpdateTaskDto) {
    return this.taskService.updateTask(taskId, dto)
  }

  @Delete(':id')
  deleteTask(@Param('id') taskId: number) {
    return this.taskService.deleteTask(taskId)
  }
}
