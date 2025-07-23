import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  cpf: string;
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsString()
  email: string;
  @IsString()
  phone: string;
}
