import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";

import { User } from '../entities';
import { Question } from "./question.entity";
import { Quiz } from "./quiz.entity";


@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", nullable: false })
  answer!: string;

  @OneToOne((_) => Question)
  @JoinColumn()
  question!: Question;

  @OneToOne((_) => User)
  @JoinColumn()
  user!: User;

  @OneToOne((_) => Quiz, quiz => quiz.id)
  @JoinColumn()
  quiz!: Quiz;

  @Column({ type: "bool" })
  isCorrect!: boolean;
}
