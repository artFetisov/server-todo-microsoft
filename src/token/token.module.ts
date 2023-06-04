import { Module } from "@nestjs/common";
import { TokenController } from "./token.controller";
import { TokenService } from "./token.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Token } from "./token.model";
import { User } from "../users/users.model";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { getJwtConfig } from "../configs/jwt.config";

@Module({
  controllers: [TokenController],
  providers: [TokenService],
  imports: [
    SequelizeModule.forFeature([Token, User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig
    })
  ],
  exports: [TokenService, JwtModule]
})
export class TokenModule {
}
