import { authMiddleware } from '@elsa-test/auth/src';
import { Quiz } from '@elsa-test/common/src/database/entities';
import { ApiResponse } from "@elsa-test/common/src/index";
import { SubmitAnswerParams } from "dto/submit-answer.dto";
import express, { Request, Response } from "express";
import { createAnswer } from 'service/answer.service';
import { generateQuiz, getAllQuiz } from "service/quiz.service";
import { GeneratedQuiz } from "types";
import { quizValidator, submitParamsCheck } from "validator/quiz.validator";

const app = express();

app.get("/",async (req: Request, res: Response<ApiResponse<Quiz[]>>) => {
  const quiz = await getAllQuiz();
  res.json({
    success: true,
    data: quiz
  });
});

app.get("/:id", quizValidator, async (req: Request, res: Response<ApiResponse<GeneratedQuiz>>) => {
  const id = parseInt(req.params.id);
  const quiz = await generateQuiz(id);
  res.json({
    success: true,
    data: quiz
  });
});

app.post("/submit", authMiddleware, submitParamsCheck ,async (req: Request<SubmitAnswerParams>, res: Response<ApiResponse>) => {
    const { answer, questionId, quizId } = req.body;
    const {id} = res.locals.user;
   await createAnswer({
      answer,
      questionId,
      quizId, 
      userId: id
    })
    res.json({
      success: true,
      message: "Answer has been submitted."
    })

})

export { app as quizController };
