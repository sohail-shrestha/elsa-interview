
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
    const repo = await AppDataSource.getRepository(Answer)
    const existingAnswer = await repo.findOne({
      where: {
        question: {id: questionId},
        quiz: {id: quizId},
        user: {id: userId}
      }
    })
    if(existingAnswer)
      await repo.update(existingAnswer.id ,{
        answer,
        question: {id: questionId},
        quiz: {id: quizId},
        user: {id: userId},
        isCorrect: await isCorrectAnswer(questionId, answer)
      })
      else
        await AppDataSource.getRepository(Answer).insert({
            answer: answer,
            question: {id: questionId},
            quiz: {id: quizId},
            user: {id: userId},
            isCorrect: await isCorrectAnswer(questionId, answer)
        })
};

export { createAnswer };

