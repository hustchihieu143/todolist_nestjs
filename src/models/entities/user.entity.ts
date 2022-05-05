import { Expose, Transform } from 'class-transformer';
// import { dateTransformer } from 'src/shares/helpers/transformer';
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from './products.entity';

@Entity({
  name: 'users',
})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Expose()
  email: string;

  @Column()
  @Expose()
  password: string;

  @Column()
  @Expose()
  name: string;

  @Column()
  @Expose()
  age: number;

  @OneToMany((type) => ProductEntity, (product) => product.user)
  products: ProductEntity[];
}
