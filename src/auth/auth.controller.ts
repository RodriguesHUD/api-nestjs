import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CredentialsDto } from 'src/users/dtos/credentials-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post('/signup')
  async signUp(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<{ message: string }> {
    await this.AuthService.signUp(createUserDto);
    return {
      message: 'Cadastro realizado com sucesso',
    };
  }

  @Post('/signin')
  async signIn(
    @Body(ValidationPipe) credentialsDto: CredentialsDto,
  ): Promise<{ token: string }> {
    console.log('Dados recebidos no controller:', credentialsDto);
    return await this.AuthService.signIn(credentialsDto);
  }
}
