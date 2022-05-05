import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({
  name: 'products',
})
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  userId: number;

  @ManyToOne((type) => UserEntity, (user) => user.products)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
