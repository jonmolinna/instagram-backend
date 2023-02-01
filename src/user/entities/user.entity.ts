import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200, name: 'name' })
  name: string;

  @Column({ type: 'varchar', length: 200, name: 'email' })
  email: string;

  @Column({ type: 'varchar', length: 200, name: 'password' })
  password: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
}
