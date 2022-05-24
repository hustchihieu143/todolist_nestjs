import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'histories',
})
export class HistoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  account: string;

  @Column()
  poolId: number;

  @Column()
  amount: number;

  @Column()
  type: number;

  @Column()
  stakedId: number;
}
