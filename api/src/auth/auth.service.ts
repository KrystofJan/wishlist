import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createRemoteJWKSet, jwtVerify } from 'jose';

@Injectable()
export class JWTService {
  constructor(private readonly config: ConfigService) {}

  async verifyToken(jwt: string) {
    // TODO: use prod env
    const currentUrl = `http://localhost:${this.config.get('port')!}`;
    const JWKS = createRemoteJWKSet(new URL(`${currentUrl}/api/auth/jwks`));
    const { payload } = await jwtVerify(jwt, JWKS, {
      issuer: currentUrl,
      audience: currentUrl,
    });
    return payload;
  }
}
