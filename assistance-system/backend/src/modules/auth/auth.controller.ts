import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('login')
  login(@Body() body: any) {
    if (body.username === 'admin' && body.password === 'Admin123!') {
      return { token: 'admin-secret-token', role: 'admin' };
    }
    throw new UnauthorizedException('Credenciales inválidas');
  }
}
