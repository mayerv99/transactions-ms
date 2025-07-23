import { Body, Controller, Get, Post } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { CreateTransactionDto } from '@app/shared-types/dto/create-transaction.dto';

@Controller()
export class TransactionsController {
  constructor(private readonly appService: TransactionsService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('/create-deposit')
  async createDeposit(@Body() payload: CreateDepositDto) {
    console.log('Chegou aqui');
    return this.appService.createDeposit(payload);
  }
  @Post('/new-transaction')
  async createPayment(@Body() payload: CreateTransactionDto) {
    return this.appService.createTransaction(payload);
  }
}
