import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, } from 'typeorm';

@Entity()
export class BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @CreateDateColumn({type: 'timestamp',})
  createdAt: Date;

  @UpdateDateColumn({type: 'timestamp',})
  updatedAt: Date;
}