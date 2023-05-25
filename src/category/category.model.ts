import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Task } from "../task/task.model";

interface CategoryCreationsAttrs {
  title: string;
}

@Table({ tableName: "categories" })
export class Category extends Model<Category, CategoryCreationsAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  title: string;

  @HasMany(() => Task)
  tasks: Task[];
}