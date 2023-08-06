export interface AvailableUserData {
  refreshToken: string;
  id: number;
}

export class AvailableUsersTokensDto {
  tokens: AvailableUserData[];
}
