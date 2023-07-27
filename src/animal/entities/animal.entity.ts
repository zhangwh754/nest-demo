import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

import { Breed, Sex } from '../dto/create-animal.dto'

@Entity()
export class Animal {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 20 })
  name: string

  @Column({ type: 'int' })
  age: number

  @Column({ type: 'enum', enum: Sex })
  sex: string

  @Column({ type: 'enum', enum: Breed })
  breed: string

  @CreateDateColumn({ type: 'timestamp' })
  create_time: Date

  @UpdateDateColumn({ type: 'timestamp' })
  update_time: Date
}
