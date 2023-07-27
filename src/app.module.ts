import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./users/users.model";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { CategoryModule } from "./category/category.module";
import { TaskModule } from "./task/task.module";
import { Task } from "./task/task.model";
import { Category } from "./category/category.model";
import { Step } from "./step/task-step.model";
import { StepModule } from "./step/step.module";
import { TokenModule } from "./token/token.module";
import * as pg from "pg";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      dialectModule: pg,
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Task, Category, Step],
      autoLoadModels: true
    }),
    UsersModule,
    AuthModule,
    CategoryModule,
    TaskModule,
    StepModule,
    TokenModule
  ]
})
export class AppModule {
}
