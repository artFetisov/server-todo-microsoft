import { Column, DataType, Model, Table } from "sequelize-typescript";

interface UserCreationsAttrs {
  email: string;
  passwordHash: string;
}

@Table({ tableName: "users" })
export class User extends Model {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  passwordHash: string;
}
