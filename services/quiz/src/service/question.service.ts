import { AppDataSource } from "@elsa-test/common/src/database/config/db-config";
import { Question } from "@elsa-test/common/src/database/entities/question.entity";

const isCorrectAnswer = async (id: number, providedAnswer: string) => {
    const question = await AppDataSource.getRepository(Question).findOne({where: {id}}); 
    return providedAnswer === question?.answer;
}


export { isCorrectAnswer };
