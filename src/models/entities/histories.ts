import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'histories',
})
export class PoolEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  poolId: number;

  @Column()
  amount: number;

  @Column()
  stakedId: number;
}
