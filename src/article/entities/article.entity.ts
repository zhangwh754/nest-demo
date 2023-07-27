import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, JoinTable } from 'typeorm'

import { Category } from '../../category/entities/category.entity'
import { Tag } from '../../tag/entities/tag.entity'

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 30 })
  title: string

  @ManyToOne(() => Category, Category => Category.articles)
  @JoinTable()
  category: Category

  @ManyToMany(() => Tag, Tag => Tag.articles)
  tags: Tag[]
}
