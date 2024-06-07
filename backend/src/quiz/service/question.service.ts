import { AppDataSource } from "config/db-config";
import { Question } from "quiz/entity/question.entity";

const isCorrectAnswer = async (id: number, providedAnswer: string) => {
    const question = await AppDataSource.getRepository(Question).findOne({where: {id}}); 
    return providedAnswer === question?.answer;
}


export {isCorrectAnswer}