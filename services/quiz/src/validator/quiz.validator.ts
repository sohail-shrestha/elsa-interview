import { ApiResponse } from "@elsa-test/common/src/index";
import { SubmitAnswerParams } from "dto/submit-answer.dto";
import { NextFunction, Request, Response } from "express";
import { quizExists } from "service/quiz.service";

const quizValidator = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const id = parseInt(request.params.id);
  const exists = await quizExists(id);
  if (exists === true) next();
  else
    response.status(404).json({ message: "Quiz doesn't exist.", status: 404 });
};

const submitParamsCheck = async   (
  request: Request<SubmitAnswerParams>,
  response : Response<ApiResponse>,
  next: NextFunction,
) => {
  const {answer, questionId, quizId} = request.body
  console.log("RequestParams", request.params)
  if(!answer || !questionId  || !quizId)
   response.status(400).json({
       success: false,
       error: "Invalid Request Parameters",
   })
 else 
   next()
 }

const answerExistsMiddleware = async   (
  request: Request<SubmitAnswerParams>,
  response: Response<ApiResponse>,
  next: NextFunction,
) => {
  
  }


export { answerExistsMiddleware, quizValidator, submitParamsCheck };

