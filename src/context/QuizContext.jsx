import { createContext, useState } from 'react';

export const QuizContext = createContext();

// eslint-disable-next-line react/prop-types
const QuizProvider = ({ children }) => {
  const [quizState, setQuizState] = useState({
    name: '',
    category: '',
    difficulty: '',
    numQuestions: '',
    questions: [],
    score: 0,
  });

  return (
    <QuizContext.Provider value={{ quizState, setQuizState }}>
      {children}
    </QuizContext.Provider>
  );
};

export default QuizProvider;
