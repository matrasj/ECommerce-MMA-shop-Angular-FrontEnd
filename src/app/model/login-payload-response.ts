export class LoginPayloadResponse {
  constructor(public authenticationToken: string,
              public refreshToken: string,
              public expiresAt: string,
              public username: string) {
  }
}
