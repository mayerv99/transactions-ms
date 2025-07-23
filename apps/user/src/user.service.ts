import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Card } from './card.entity';
import { CreateCardDto } from './dto/create-card.dto';
import { CreateDepositDto } from '@app/shared-types/dto/create-deposit.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async createUser(payload: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(payload);
    return this.userRepository.save(user);
  }

  async createCard(payload: CreateCardDto): Promise<Card> {
    const { cpf } = payload;

    const user = await this.userRepository.findOne({ where: { cpf } });
    if (!user) {
      throw new Error('User not found');
    }
    const card = this.cardRepository.create({ user });
    return this.cardRepository.save(card);
  }

  async addNewDeposit(depositDto: CreateDepositDto) {
    const cardData = await this.cardRepository.findOne({
      where: { id: depositDto.cardId },
      relations: ['user'],
    });

    if (!cardData) return;
    const { user } = cardData;

    user.balanceInCents += depositDto.amountInCents;
    return this.userRepository.save(user);
  }
}
