import { IsString, IsNumber } from 'class-validator';

export class CreateDepositDto {
  @IsString()
  cardId: string;

  @IsNumber()
  amountInCents: number;
}
