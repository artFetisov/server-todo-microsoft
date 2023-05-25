import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { StepService } from "./step.service";
import { CreateStepDto } from "./dto/create-step.dto";
import { UpdateStepDto } from "./dto/update-step.dto";

@Controller("tasks/steps")
export class StepController {
  constructor(private stepService: StepService) {
  }

  @Get("/all")
  getAllSteps() {
    return this.stepService.getAllSteps();
  }

  @Get(":taskId")
  getSteps(@Param("taskId") taskId: number) {
    return this.stepService.getSteps(taskId);
  }

  @Post()
  createStep(@Body() dto: CreateStepDto) {
    return this.stepService.createStep(dto);
  }

  @Put(":id")
  updateStep(@Param("id") stepId: number, @Body() dto: UpdateStepDto) {
    return this.stepService.updateStep(stepId, dto);
  }

  @Delete(":id")
  deleteStep(@Param("id") stepId: number) {
    return this.stepService.deleteStep(stepId);
  }
}
