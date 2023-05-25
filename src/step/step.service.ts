import { InjectModel } from "@nestjs/sequelize";
import { Step } from "./task-step.model";
import { CreateStepDto } from "./dto/create-step.dto";
import { UpdateStepDto } from "./dto/update-step.dto";

export class StepService {
  constructor(@InjectModel(Step) private stepRepository: typeof Step) {
  }

  async getAllSteps() {
    return this.stepRepository.findAll();
  }

  async getSteps(taskId: number) {
    return this.stepRepository.findAll({ where: { taskId } });
  }

  async createStep(dto: CreateStepDto) {
    return this.stepRepository.create(dto);
  }

  async updateStep(stepId: number, dto: UpdateStepDto) {
    const step = await this.stepRepository.findOne({ where: { id: stepId } });

    await step.update(dto);

    return step;
  }

  async deleteStep(id: number) {
    const step = await this.stepRepository.findOne({ where: { id } });

    await step.destroy();

    return step;
  }
}
