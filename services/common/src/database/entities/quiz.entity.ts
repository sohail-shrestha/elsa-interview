import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./question.entity";

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToMany(() => Question, (question) => question.quiz)
  @JoinTable()
  questions!: Question[];
}
