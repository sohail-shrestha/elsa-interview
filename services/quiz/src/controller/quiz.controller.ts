import { SubmitAnswerParams } from "dto/submit-answer.dto";
import express, { Request, Response } from "express";
import { generateQuiz, getAllQuiz } from "service/quiz.service";
import { GeneratedQuiz } from "types";
import { ApiResponse } from "@elsa-test/common/src/index";
import { quizValidator, submitParamsCheck } from "validator/quiz.validator";

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
