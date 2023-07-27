import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

import { Sex } from '../dto/create-user.dto'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 20 })
  nickname: string

  @Column({ type: 'enum', enum: Sex })
  sex: string

  @Column({ type: 'int' })
  age: number

  @Column({ type: 'varchar', length: 36, select: false })
  password: string

  @Column({ type: 'varchar', default: 'user' })
  role: string

  @CreateDateColumn({ type: 'timestamp' })
  create_time: Date

  @UpdateDateColumn({ type: 'timestamp' })
  update_time: Date
}
