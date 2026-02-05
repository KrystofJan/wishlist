import { Injectable, Inject } from '@nestjs/common';
import { Auth, betterAuth } from 'better-auth';

// TODO: Implement authentication
@Injectable()
export class AuthService {
  constructor(
    @Inject('BETTER_AUTH') private readonly auth: ReturnType<typeof betterAuth>,
  ) {}
}
