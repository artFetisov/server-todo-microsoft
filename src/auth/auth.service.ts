import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import * as bcrypt from "bcryptjs";
import { User } from "src/users/users.model";
import { AuthDto } from "./dto/auth.dto";
import { RefreshTokenDto } from "./dto/refresh-token.dto";
import { TokenService } from "src/token/token.service";
import { AvailableUsersTokensDto } from "./dto/dataUsers.dto";
import { ConfigService } from "@nestjs/config";

export interface AllSettledUserData {
  status?: "rejected" | "fulfilled";
  value?: { id: number, email: string };
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private tokenService: TokenService,
    private readonly configService: ConfigService
  ) {
  }

  async registration({ email, password }: AuthDto) {
    const candidate = await this.userService.getUserByEmail(email);
    if (candidate) {
      throw new HttpException("Пользователь с таким email существует", HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcrypt.hash(password, 5);

    const user = await this.userService.createUser({
      email,
      password: hashPassword
    });

    const tokens = await this.tokenService.issueTokenPair(user);

    await this.tokenService.saveToken(user.id, tokens.refreshToken);

    return {
      user: this.getUserFields(user),
      tokens
    };
  }

  private getUserFields(user: User) {
    return {
      id: user.id,
      email: user.email
    };
  }

  async login(authDto: AuthDto) {
    const user = await this.validateUser(authDto);

    const tokens = await this.tokenService.issueTokenPair(user);

    await this.tokenService.saveToken(user.id, tokens.refreshToken);

    return {
      user: this.getUserFields(user),
      tokens
    };
  }

  private async validateUser(authDto: AuthDto) {
    const user = await this.userService.getUserByEmail(authDto.email);
    if (!user) {
      throw new HttpException("Пользователь с таким email не найден", HttpStatus.NOT_FOUND);
    }

    const isComparePassword = await bcrypt.compare(authDto.password, user.passwordHash);
    if (!isComparePassword) {
      throw new HttpException("Неверный пароль", HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  async refreshTokens({ refreshToken }: RefreshTokenDto) {
    if (!refreshToken) {
      throw new HttpException(
        "Пожалуйста зарегистрируйтесь или войдите, неправильный refresh-token",
        HttpStatus.UNAUTHORIZED
      );
    }

    const result = await this.tokenService.validateToken(refreshToken, this.configService.get("PRIVATE_KEY_REFRESH"));
    if (!result) {
      throw new HttpException("Неверный токен доступа", HttpStatus.UNAUTHORIZED);
    }

    const foundToken = await this.tokenService.findToken(refreshToken);
    console.log("----", foundToken, "---");
    if (!foundToken) {
      throw new HttpException("Неверный токен обновления", HttpStatus.BAD_REQUEST);
    }

    const user = await this.userService.getUserByEmail(result.email);

    const tokens = await this.tokenService.issueTokenPair(user);

    return {
      user: this.getUserFields(user),
      tokens
    };
  }

  async authMe(userId: number) {
    const user = await this.userService.getUserById(userId);

    if (!user) {
      throw new HttpException("Пользователь не найден", HttpStatus.NOT_FOUND);
    }

    const tokens = await this.tokenService.issueTokenPair(user);

    await this.tokenService.saveToken(user.id, tokens.refreshToken);

    return {
      user: this.getUserFields(user),
      tokens
    };
  }

  async logout({ refreshToken }: RefreshTokenDto) {
    await this.tokenService.removeToken(refreshToken);
  }

  async getVerifyUsers(usersData: AvailableUsersTokensDto) {
    if (!usersData.tokens) {
      return;
    }

    const result = await Promise.allSettled(
      usersData.tokens.map(async (tokenPair) => {
        const validatedData: { id: number; email: string } = await this.tokenService.validateToken(tokenPair.refreshToken, this.configService.get("PRIVATE_KEY_REFRESH"));
        if (!validatedData) return;

        const currentUser = await this.userService.getUserById(validatedData.id);
        if (!currentUser) return;

        const tokens = await this.tokenService.issueTokenPair(currentUser);

        await this.tokenService.saveToken(currentUser.id, tokens.refreshToken);

        return {
          user: this.getUserFields(currentUser),
          tokens
        };
      })
    );

    return result.filter(r => r.status === "fulfilled");
  }
}
