import { ApiResponse } from "./api-response";

type Question = {
  id: number;
  question: string;
  options: string[];
};

type QuizApiResponse = ApiResponse<{
  id: number;
  questions: Question[];
}>;

export type { QuizApiResponse };
