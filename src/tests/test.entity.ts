import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Test {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  request: string;

  @Column()
  atmn_tests: string;

  @Column()
  test_name: string;

  @Column()
  api_name: string;

  @ManyToOne((_type) => User, (user) => user.tests, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
