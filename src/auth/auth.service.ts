import { CreateUserDto } from './../users/dtos/create-user.dto';
import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CredentialsDto } from 'src/users/dtos/credentials-user.dto';
import { UserRole } from 'src/users/user-role.enum';
import { User } from 'src/users/user.entity';
import { UserRepository } from 'src/users/user.repository';

@Injectable()
export class AuthService {
  jwtService: any;
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password != createUserDto.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não conferem');
    } else {
      return await this.userRepository.createUser(createUserDto, UserRole.USER);
    }
  }

  async signIn(credentialsDto: CredentialsDto) {
    const user = await this.userRepository.checkCredentials(credentialsDto);

    if (user == null) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const jwtPayload = {
      id: user.id,
    };
    const token = await this.jwtService.sigin(jwtPayload);

    return { token };
  }
}
