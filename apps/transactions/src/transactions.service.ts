import { Inject, Injectable } from '@nestjs/common';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { ClientKafka } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Deposit } from './deposit.entity';
import { Repository } from 'typeorm';
import { lastValueFrom } from 'rxjs';
import { CreateTransactionDto } from '@app/shared-types/dto/create-transaction.dto';
import { Transaction } from './transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Deposit)
    private readonly depositRepository: Repository<Deposit>,
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
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
  async createTransaction(transactionDto: CreateTransactionDto) {
    //     {
    //   amountInCents: 1000,
    //   cardId: 'a0f9851e-a8e9-4c30-994c-65cbdce042b9',
    //   items: { itemId: 'coquinha', quantity: 2 }
    // }
    const transaction = this.transactionRepository.create({
      cardId: transactionDto.cardId,
      amountInCents: transactionDto.amountInCents,
    });
    await lastValueFrom(this.kafkaClient.emit('purchase', transactionDto));
    return this.transactionRepository.save(transaction);
  }
}
