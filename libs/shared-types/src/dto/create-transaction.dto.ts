import { IsString, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class PurchaseItemsDto {
  @IsString()
  itemId: string;

  @IsNumber()
  quantity: number;
}
export class CreateTransactionDto {
  @IsString()
  cardId: string;

  @IsNumber()
  amountInCents: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PurchaseItemsDto)
  items: PurchaseItemsDto[];
}
