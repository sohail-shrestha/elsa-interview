import { Question } from "@elsa-test/common/src/database/entities/question.entity";
import { Quiz } from "@elsa-test/common/src/database/entities/quiz.entity";
import { AppDataSource } from "@elsa-test/common/src/index";
import { GeneratedQuestion, GeneratedQuiz } from "types";

const getAllQuiz: () => Promise<Quiz[]> = () => {
  return AppDataSource.getRepository(Quiz).find({
    relations: {questions: true}
  });
};

const getQuizById: (id: number) => Promise<Quiz | null> = async (
  id: number,
) => {
  return AppDataSource.getRepository(Quiz).findOne({
    where: { id },
    relations: { questions: true },
  });
};

const buildOptions: (questionId: number) => Promise<string[]> = async (
  questionId: number,
) => {
  const randomOptions = await AppDataSource.getRepository(Question)
    .createQueryBuilder("question")
    .where("question.id != :id", { id: questionId })
    .orderBy("RANDOM()")
    .limit(3)
    .getMany()
    .then((questions) => questions.map((question) => question.answer));

  const correctOption = await AppDataSource.getRepository(Question).findOne({
    where: { id: questionId },
  });

  const randomIndex = Math.floor(Math.random() * (randomOptions.length + 1));

  if (correctOption) {
    randomOptions.splice(randomIndex, 0, correctOption.answer);
  }
  return randomOptions;
};

const generateQuestionsForQuiz: (
  quiz: Quiz,
) => Promise<GeneratedQuestion[]> = async (quiz: Quiz) => {
  return await Promise.all(
    quiz!.questions.map(async ({ id, question }) => {
      const options = await buildOptions(id);
      return {
        id,
        question,
        options,
      };
    }),
  );
};

const generateQuiz: (quizId: number) => Promise<GeneratedQuiz> = async (
  quizId: number,
) => {
  if ((await quizExists(quizId)) === false) {
    throw new Error(`Quiz with id ${quizId} doesn't exist.`);
  }
  const quiz = await getQuizById(quizId);
  const questions = await generateQuestionsForQuiz(quiz!);

  return {
    id: quiz!.id,
    questions,
  };
};

const quizExists: (id: number) => Promise<boolean> = async (id: number) => {
  return AppDataSource.getRepository(Quiz).exists({ where: { id } });
};

export { generateQuiz, getAllQuiz, getQuizById, quizExists };
