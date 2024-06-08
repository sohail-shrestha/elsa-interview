import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
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

  @ManyToMany((_) => Quiz, (quiz) => quiz.questions)
  quiz!: Quiz[];

}
