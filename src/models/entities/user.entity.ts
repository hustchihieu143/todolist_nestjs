import { Expose, Transform } from 'class-transformer';
// import { dateTransformer } from 'src/shares/helpers/transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
}
