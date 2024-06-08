import { Quiz } from "@elsa-test/common/src/database/entities/quiz.entity";
import { GeneratedQuiz } from "types";
declare const getAllQuiz: () => Promise<Quiz[]>;
declare const getQuizById: (id: number) => Promise<Quiz | null>;
declare const generateQuiz: (quizId: number) => Promise<GeneratedQuiz>;
declare const quizExists: (id: number) => Promise<boolean>;
export { generateQuiz, getAllQuiz, getQuizById, quizExists };
