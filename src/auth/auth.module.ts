import { forwardRef, Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersModule } from "src/users/users.module";
import { ConfigModule } from "@nestjs/config";
import { TokenModule } from "../token/token.module";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  imports: [
    forwardRef(() => UsersModule),
    TokenModule,
    ConfigModule,
    PassportModule,
  ],
  exports: [AuthService],
})
export class AuthModule {}
