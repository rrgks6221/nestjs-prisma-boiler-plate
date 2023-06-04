import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  createAccessToken(id: number) {
    const payload = { id };

    return this.jwtService.sign(payload);
  }

  login(id: number) {
    const payload = { id };

    return this.jwtService.sign(payload);
  }
}
