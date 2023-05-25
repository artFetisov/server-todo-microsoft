import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Task } from "../task/task.model";

interface StepCreationsAttrs {
  title;
}

@Table({ tableName: "steps" })
export class Step extends Model<Step, StepCreationsAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  completed: boolean;

  @ForeignKey(() => Task)
  @Column({ type: DataType.INTEGER })
  taskId: number;

  @BelongsTo(() => Task)
  task: Task;
}
