import express, { Request, Response } from "express";
import { SubmitAnswerParams } from "quiz/dto/submit-answer.dto";
import { generateQuiz, getAllQuiz } from "quiz/service/quiz.service";
import { GeneratedQuiz } from "quiz/types";
import { quizValidator, submitParamsCheck } from "quiz/validator/quiz.validator";
import { ApiResponse } from "types/ApiResponse";

const app = express();

app.get("/", async (req: Request, res: Response) => {
  const quiz = await getAllQuiz();
  res.json(quiz);
});

app.get("/:id", quizValidator, async (req: Request, res: Response<ApiResponse<GeneratedQuiz>>) => {
  const id = parseInt(req.params.id);
  const quiz = await generateQuiz(id);
  res.json({
    success: true,
    data: quiz
  });
});

app.post("/submit", submitParamsCheck ,async (req: Request<SubmitAnswerParams>, res: Response) => {
    // createAnswer(req.body)
});

export { app as quizController };
