"use client";
import { useEffect, useState } from "react";
import { QuizApiResponse } from "../../models/quiz-api-response";

interface AnswerMap  {
    [key: number]: string;
}

export const getQuiz = async () => {
  const res = await fetch(`http://localhost:3000/quiz/1`);
  const data: QuizApiResponse = await res.json();
  return data;
};

const QuizPage = () => {
  const [quiz, setQuiz] = useState<QuizApiResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<AnswerMap>({})

  const fetchQuiz = async () => {
    setIsLoading(true);
    const response = await getQuiz();
    setQuiz(response);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  const handleCheckboxChange = (
    questionId: number,
    answer: string
  ) => {
    setSelectedAnswer(
        (prevState) => ({
            ...prevState,
            [questionId]: answer
        })
    )
  };

  const handleSubmit = () => {
    
  }

  return (
    <div>
      Quiz
      <div>
        {isLoading ? (
          <div>...Loading</div>
        ) : (
          quiz?.data?.questions?.map((question) => {
            return (
              <>
                <div>{question.question}</div>
                <div>
                  {question.options.map((option, index) => (
                    <div key={`${question}-${index}`}>
                      <input
                        type="checkbox"
                        id={option}
                        value={option}
                        checked={selectedAnswer && selectedAnswer[question.id] === option}
                        onChange={() => {
                            handleCheckboxChange(question.id, option)
                        }}
                      />
                      {option}
                    </div>
                  ))}
                </div>
              </>
            );
          })
        )}
      </div>
      <button type="button" onClick={handleSubmit}>Submit Answers</button>

    </div>
  );
};

export default QuizPage;
