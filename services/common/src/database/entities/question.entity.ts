import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Quiz } from "./quiz.entity";

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", unique: true })
  question!: string;

  @Column({ type: "varchar" })
  answer!: string;

  @ManyToOne((_) => Quiz, (quiz) => quiz.questions)
  quiz!: Quiz[];

}
