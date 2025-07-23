import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('deposits')
export class Deposit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amountInCents: number;

  @Column()
  cardId: string;

  @CreateDateColumn()
  createdAt: Date;
}
