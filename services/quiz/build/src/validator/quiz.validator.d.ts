import { SubmitAnswerParams } from "dto/submit-answer.dto";
import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "types/ApiResponse";
declare const quizValidator: (request: Request, response: Response, next: NextFunction) => Promise<void>;
declare const submitParamsCheck: (request: Request<SubmitAnswerParams>, response: Response<ApiResponse>, next: NextFunction) => Promise<void>;
declare const answerExistsMiddleware: (request: Request<SubmitAnswerParams>, response: Response<ApiResponse>, next: NextFunction) => Promise<void>;
export { answerExistsMiddleware, quizValidator, submitParamsCheck };
