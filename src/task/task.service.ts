import { InjectModel } from '@nestjs/sequelize'
import { Task } from './task.model'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { HttpException, HttpStatus } from '@nestjs/common'
import { CategoryService } from 'src/category/category.service'
import { Category } from 'src/category/category.model'
import { Op } from 'sequelize'

export class TaskService {
  constructor(@InjectModel(Task) private taskRepository: typeof Task, private categoryService: CategoryService) {}

  async getAll(): Promise<Task[]> {
    return this.taskRepository.findAll({ include: { all: true } })
  }

  async getByCategoryId(categoryId: number) {
    return this.taskRepository.findAll({ where: { categoryId }, include: { all: true } })
  }

  async createTask(dto: CreateTaskDto) {
    const newTask = await this.taskRepository.create(dto, { include: Category })
    const category = await this.categoryService.getCategoryById(newTask.categoryId)

    return { newTask, category }
  }

  async searchByTitle(title: string) {
    return this.taskRepository.findAll({
      where: {
        title: {
          [Op.like]: `%${title}%`,
        },
      },
      include: { all: true },
    })
  }

  async sort(categoryId: number, property: string, direction: string) {
    return this.taskRepository.findAll({
      where: { categoryId },
      include: { all: true },
      order: [[property, direction]],
    })
  }

  async updateTask(id: number, dto: UpdateTaskDto) {
    const task = await this.taskRepository.findOne({ where: { id }, include: { all: true } })

    await task.update({ ...dto })

    return task
  }

  async deleteTask(taskId: number) {
    const task = await this.taskRepository.findOne({ where: { id: taskId } })

    if (!task) {
      throw new HttpException('Такая задача не найдена', HttpStatus.NOT_FOUND)
    }

    await task.destroy()

    return task
  }
}
