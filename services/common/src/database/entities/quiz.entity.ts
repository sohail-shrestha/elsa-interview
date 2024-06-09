import { Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./question.entity";

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany(() => Question, (question) => question.quiz)
  @JoinTable()
  questions!: Question[];
}
