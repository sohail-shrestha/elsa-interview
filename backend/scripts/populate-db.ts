import { DataSource } from "typeorm";
import { Question } from "../src/quiz/entity/question.entity";
import { Quiz } from "../src/quiz/entity/quiz.entity";
import { wordMeanings } from "../src/quiz/mocks/dictionary";

/*
 * Note these scripts are to populate the database. In a real world, we would be using CMS. But for this particular test, we are using a script.
 */
const populateQuestions = async (dataSource: DataSource) => {
  const questionCount = await dataSource.manager.count(Question);

  if (questionCount === 0) {
    for (const key in wordMeanings) {
      if (Object.prototype.hasOwnProperty.call(wordMeanings, key)) {
        const value = wordMeanings[key];
        console.debug(value, key);
        await dataSource.manager.insert(Question, {
          question: key,
          answer: value,
        });
      }
    }
  }
};

function selectRandomFromArray<T>(array: T[], count: number): T[] {
  const shuffled = array.sort(() => Math.random() - 0.5); // Shuffle the array randomly
  return shuffled.slice(0, count); // Return the first 'count' items from the shuffled array
}

const populateQuiz = async (dataSource: DataSource) => {
  await populateQuestions(dataSource);
  const quizCount: number = await dataSource.manager.count(Quiz);
  if (quizCount === 0) {
    const questions = await dataSource.manager.find(Question);
    const randomQuestions = selectRandomFromArray(questions, 3);
    await dataSource.manager.save(Quiz, { questions: randomQuestions });
  }
};

export { populateQuiz };
