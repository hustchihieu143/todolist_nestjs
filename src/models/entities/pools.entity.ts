import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'pools',
})
export class PoolEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  acceptedToken: string;

  @Column()
  cap: number;

  @Column()
  lockDuration: number;

  @Column()
  delayDuration: number;

  @Column()
  APR: number;
}
