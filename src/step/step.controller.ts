import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { StepService } from "./step.service";
import { CreateStepDto } from "./dto/create-step.dto";
import { UpdateStepDto } from "./dto/update-step.dto";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";

@Controller("tasks/steps")
export class StepController {
  constructor(private stepService: StepService) {
  }

  @UseGuards(JwtAuthGuard)
  @Get("/all")
  getAllSteps() {
    return this.stepService.getAllSteps();
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Get(":taskId")
  getSteps(@Param("taskId") taskId: number) {
    return this.stepService.getSteps(taskId);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post()
  createStep(@Body() dto: CreateStepDto) {
    return this.stepService.createStep(dto);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Put(":id")
  updateStep(@Param("id") stepId: number, @Body() dto: UpdateStepDto) {
    return this.stepService.updateStep(stepId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Delete(":id")
  deleteStep(@Param("id") stepId: number) {
    return this.stepService.deleteStep(stepId);
  }
}
