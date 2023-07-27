import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm'

import { Category } from '../../category/entities/category.entity'

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 30 })
  title: string

  @ManyToMany(() => Category, Category => Category.articles)
  @JoinTable()
  categories: Category[]
}
