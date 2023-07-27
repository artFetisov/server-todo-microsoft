import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Task } from "../task/task.model";
import { User } from "../users/users.model";

interface CategoryCreationsAttrs {
  title: string;
  userId: number;
}

@Table({ tableName: "categories" })
export class Category extends Model<Category, CategoryCreationsAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  title: string;

  @HasMany(() => Task)
  tasks: Task[];

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;
}
