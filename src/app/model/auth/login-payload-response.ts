export class LoginPayloadResponse {
  constructor(public authenticationToken: string,
              public expiresAt: string,
              public username: string) {
  }
}
