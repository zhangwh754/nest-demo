import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm'

import { Article } from '../../article/entities/article.entity'

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 20 })
  name: string

  @ManyToMany(() => Article, Article => Article.categories)
  articles: Article[]
}
