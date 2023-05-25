import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Category } from "../category/category.model";
import { Step } from "../step/task-step.model";

interface TaskCreationsAttrs {
  title;
}

@Table({ tableName: "tasks" })
export class Task extends Model<Task, TaskCreationsAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  priority: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  completed: boolean;

  @Column({ type: DataType.DATE, defaultValue: null })
  completionDate: Date;

  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER })
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;

  @HasMany(() => Step)
  steps: Step;
}