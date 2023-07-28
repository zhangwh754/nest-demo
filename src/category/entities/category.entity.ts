import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'

import { Article } from '../../article/entities/article.entity'
import { Tag } from 'src/tag/entities/tag.entity'

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 20 })
  name: string

  @OneToMany(() => Article, Article => Article.category, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  articles: Article[]

  @OneToMany(() => Tag, Tag => Tag.category)
  tags: Tag[]
}
