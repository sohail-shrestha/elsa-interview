
import { Answer } from '@elsa-test/common/src/database/entities/answer.entity';
import { AppDataSource } from "@elsa-test/common/src/index";
import { isCorrectAnswer } from "service/question.service";
import { CreateAnswerParams } from "types";

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

