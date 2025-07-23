import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateCardDto } from './dto/create-card.dto';
import { Card } from './card.entity';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateDepositDto } from '@app/shared-types/dto/create-deposit.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(): string {
    return this.userService.getHello();
  }
  @Post('/create-user')
  async createUser(@Body() payload: CreateUserDto): Promise<CreateUserDto> {
    return this.userService.createUser(payload);
  }

  @Post('/create-card')
  async createCard(@Body() payload: CreateCardDto): Promise<Card> {
    return this.userService.createCard(payload);
  }
  @MessagePattern('deposit')
  async handleDepositCreated(@Payload() depositDto: CreateDepositDto) {
    console.log('Entrou aqui no MessagePattern');
    await this.userService.addNewDeposit(depositDto);
  }
}
