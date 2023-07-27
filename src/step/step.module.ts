import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Step } from "../step/task-step.model";
import { StepService } from "./step.service";
import { StepController } from "./step.controller";

@Module({
  controllers: [StepController],
  providers: [StepService],
  imports: [SequelizeModule.forFeature([Step])],
  exports: [StepService],
})
export class StepModule {}
