import { Controller, Post, Body, Res, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import type { Response, Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response, // <-- Inyectar Response
  ) {
    const { accessToken } = await this.authService.login(loginUserDto);

    // Configurar la cookie
    response.cookie('access_token', accessToken, {
      httpOnly: true, // Seguridad: No accesible por JS
      secure: false, // En producción debe ser 'true' (solo HTTPS)
      sameSite: 'strict', // Protección CSRF
      maxAge: 3600000, // 1 hora (debe coincidir con 'expiresIn' del JWT)
    });

    return { message: 'Login exitoso' };
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    // Para desloguear, simplemente limpiamos la cookie
    response.clearCookie('access_token', {
      httpOnly: true,
      secure: false, // (igual que en login)
      sameSite: 'strict',
    });
    return { message: 'Logout exitoso' };
  }
}