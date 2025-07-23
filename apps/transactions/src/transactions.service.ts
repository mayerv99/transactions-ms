import { Inject, Injectable } from '@nestjs/common';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { ClientKafka } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Deposit } from './deposit.entity';
import { Repository } from 'typeorm';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Deposit)
    private readonly depositRepository: Repository<Deposit>,
    @Inject('TRANSACTIONS_SERVICE')
    private kafkaClient: ClientKafka,
  ) {}
  async onModuleInit() {
    await this.kafkaClient.connect().catch((err) => {
      console.error('Errors connecting to Kafka:', err);
    });
  }
  getHello(): string {
    return 'Hello World!';
  }
  async createDeposit(depositDto: CreateDepositDto) {
    const deposit = this.depositRepository.create(depositDto);
    await lastValueFrom(this.kafkaClient.emit('deposit', depositDto));
    return this.depositRepository.save(deposit);
  }
}
