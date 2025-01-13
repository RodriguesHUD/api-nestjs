import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [UsersService, UserRepository],
  controllers: [UsersController],
})
export class UsersModule {}
