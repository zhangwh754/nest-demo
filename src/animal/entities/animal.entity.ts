import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Animal {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 20 })
  name: string

  @Column({ type: 'int' })
  age: number

  @Column({ type: 'enum', enum: ['male', 'female'] })
  sex: string

  @Column({ type: 'enum', enum: ['dog', 'cat', 'rabbit'] })
  breed: string

  @CreateDateColumn({ type: 'timestamp' })
  create_time: Date

  @UpdateDateColumn({ type: 'timestamp' })
  update_time: Date
}
