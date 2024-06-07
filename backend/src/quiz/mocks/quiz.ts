type Question = {
  id: number;
  question: string;
  options: string[];
};

type Quiz = {
  id: number;
  questions: Question[];
};

const getMockedQuiz: () => Promise<Quiz[]> = () => {
  const quizzes = [
    {
      id: 1,
      questions: [
        {
          id: 1,
          question: "aberration",
          options: [
            "a departure from what is normal, usual, or expected, typically an unwelcome one",
            "friendly, lively, and enjoyable",
            "lasting for a very short time",
            "the occurrence and development of events by chance in a happy or beneficial way",
          ],
        },
        {
          id: 2,
          question: "convivial",
          options: [
            "friendly, lively, and enjoyable",
            "a feeling of pensive sadness, typically with no obvious cause",
            "proceeding in a gradual, subtle way, but with harmful effects",
            "present, appearing, or found everywhere",
          ],
        },
        {
          id: 3,
          question: "ephemeral",
          options: [
            "lasting for a very short time",
            "a departure from what is normal, usual, or expected, typically an unwelcome one",
            "the time at which something is most powerful or successful",
            "friendly, lively, and enjoyable",
          ],
        },
      ],
    },
    {
      id: 2,
      questions: [
        {
          id: 1,
          question: "insidious",
          options: [
            "proceeding in a gradual, subtle way, but with harmful effects",
            "the occurrence and development of events by chance in a happy or beneficial way",
            "lasting for a very short time",
            "a departure from what is normal, usual, or expected, typically an unwelcome one",
          ],
        },
        {
          id: 2,
          question: "melancholy",
          options: [
            "a feeling of pensive sadness, typically with no obvious cause",
            "friendly, lively, and enjoyable",
            "the time at which something is most powerful or successful",
            "present, appearing, or found everywhere",
          ],
        },
        {
          id: 3,
          question: "serendipity",
          options: [
            "the occurrence and development of events by chance in a happy or beneficial way",
            "a feeling of pensive sadness, typically with no obvious cause",
            "proceeding in a gradual, subtle way, but with harmful effects",
            "present, appearing, or found everywhere",
          ],
        },
      ],
    },
    {
      id: 3,
      questions: [
        {
          id: 1,
          question: "ubiquitous",
          options: [
            "present, appearing, or found everywhere",
            "a departure from what is normal, usual, or expected, typically an unwelcome one",
            "friendly, lively, and enjoyable",
            "the time at which something is most powerful or successful",
          ],
        },
        {
          id: 2,
          question: "zenith",
          options: [
            "the time at which something is most powerful or successful",
            "lasting for a very short time",
            "the occurrence and development of events by chance in a happy or beneficial way",
            "a feeling of pensive sadness, typically with no obvious cause",
          ],
        },
      ],
    },
  ];
  return Promise.resolve(quizzes);
};

export { Quiz, getMockedQuiz };
