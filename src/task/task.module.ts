import { CategoryModule } from "./../category/category.module";
import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { TaskController } from "./task.controller";
import { TaskService } from "./task.service";
import { Task } from "./task.model";
import { Step } from "../step/task-step.model";

@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [SequelizeModule.forFeature([Task, Step]), CategoryModule],
  exports: [TaskService],
})
export class TaskModule {}
