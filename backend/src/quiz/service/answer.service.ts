import { AppDataSource } from "config/db-config";
import { Answer } from "quiz/entity/answer.entity";
import { isCorrectAnswer } from "quiz/service/question.service";
import { CreateAnswerParams } from "quiz/types";

const createAnswer: (params: CreateAnswerParams) => Promise<void> = async ({
  answer,
  questionId,
  userId,
  quizId,
}: CreateAnswerParams) => {
    isCorrectAnswer(questionId, answer)
    await AppDataSource.getRepository(Answer).insert({
        answer: answer,
        question: {id: questionId},
        quiz: {id: quizId},
        isCorrect: await isCorrectAnswer(questionId, answer)
    })
};

export { createAnswer };

