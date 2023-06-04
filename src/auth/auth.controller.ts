import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
import { RefreshTokenDto } from "./dto/refresh-token.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @UsePipes(new ValidationPipe())
  @Post("/login")
  @HttpCode(200)
  login(@Body() authDto: AuthDto) {
    return this.authService.login(authDto);
  }

  @UsePipes(new ValidationPipe())
  @Post("/registration")
  registration(@Body() authDto: AuthDto) {
    return this.authService.registration(authDto);
  }

  @UsePipes(new ValidationPipe())
  @Post("/refresh")
  @HttpCode(200)
  refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshTokens(refreshTokenDto);
  }

  @UsePipes(new ValidationPipe())
  @Post("/logout")
  @HttpCode(200)
  logout(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.logout(refreshTokenDto);
  }
}
