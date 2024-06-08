type GeneratedQuestion = {
  id: number;
  question: string;
  options: string[];
};

type GeneratedQuiz = {
  id: number;
  questions: GeneratedQuestion[];
};

type CreateAnswerParams = {
  answer: string;
  questionId: number;
  userId: number;
  quizId: number;
};



export { GeneratedQuestion, GeneratedQuiz, CreateAnswerParams };
