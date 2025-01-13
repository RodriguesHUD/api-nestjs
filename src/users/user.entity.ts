import {
  BaseEntity,
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  email: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  name: string;

  @Column({ nullable: false, type: 'varchar', length: 20 })
  role: string;

  @Column({ nullable: false, default: true })
  status: boolean;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  salt: string;

  @Column({ nullable: true, type: 'varchar', length: 64 })
  confirmationToken: string;

  @Column({ nullable: true, type: 'varchar', length: 64 })
  recoverToken: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // TODO: salvar data em horario de brasilia
  // @CreateDateColumn()
  // createdAt: Date;

  // @BeforeInsert()
  // setCreatedAt() {
  //   this.createdAt = new Date(
  //     new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
  //   );
  // }

  // @UpdateDateColumn()
  // updatedAt: Date;

  // @BeforeUpdate()
  // setUpdateAt() {
  //   this.updatedAt = new Date(
  //     new Date().toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
  //   );
  // }

  async checkPassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
