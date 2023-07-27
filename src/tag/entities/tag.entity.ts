import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, JoinTable } from 'typeorm'

import { Article } from '../../article/entities/article.entity'
import { Category } from '../../category/entities/category.entity'

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 20 })
  name: string

  @ManyToMany(() => Article, Article => Article.tags)
  @JoinTable()
  articles: Article[]

  @ManyToOne(() => Category, Category => Category.tags)
  @JoinTable()
  category: Category
}
