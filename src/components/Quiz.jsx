/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../context/QuizContext";
import "../Styles/Quiz.css";

const Quiz = () => {
  const navigate = useNavigate();
  const { quizState, setQuizState } = useContext(QuizContext);

  const { name, category, difficulty, numQuestions, questions, score } =
    quizState;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timer, setTimer] = useState(0);
  const [isTimerExpired, setIsTimerExpired] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await axios.get(
        `https://opentdb.com/api.php?amount=${numQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`
      );
      setQuizState({ ...quizState, questions: response.data.results });
      setTimer(getTimerValue(difficulty));
    };
    if (questions.length === 0) {
      fetchQuestions();
    } else {
      setTimer(getTimerValue(difficulty));
    }
  }, [category, difficulty, numQuestions, questions, setQuizState, quizState]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setIsTimerExpired(true);
    }
  }, [timer]);

  const getTimerValue = (difficulty) => {
    const timerMap = { easy: 10, medium: 20, hard: 30 };
    return timerMap[difficulty];
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestionIndex].correct_answer) {
      setQuizState({ ...quizState, score: score + 1 });
    }
    setSelectedAnswer(null);
    setIsCorrect(null);
    setIsTimerExpired(false);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimer(getTimerValue(difficulty));
    } else {
      navigate("/leaderboard");
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setTimer(getTimerValue(difficulty));
    }
  };

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
    if (answer === questions[currentQuestionIndex].correct_answer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const handleSubmitQuiz = () => {
    navigate("/leaderboard");
  };

  return (
    <div className="quiz-container">
      <div style={{display:"flex", width:"95%", margin:"auto", gap:"8%" }}>
        <h3>{`${currentQuestionIndex + 1}. `}{questions[currentQuestionIndex]?.question}</h3>
        <h3>{` ${currentQuestionIndex + 1} of ${numQuestions}`}</h3>
      </div>
      <div className="options">
        {questions[currentQuestionIndex]?.incorrect_answers
          .concat(questions[currentQuestionIndex]?.correct_answer)
          .sort()
          .map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelection(option)}
              className={`
              ${selectedAnswer === option ? "selected" : ""}
              ${
                selectedAnswer &&
                option === questions[currentQuestionIndex].correct_answer
                  ? "correct"
                  : ""
              }
              ${
                selectedAnswer &&
                option !== questions[currentQuestionIndex].correct_answer &&
                selectedAnswer === option
                  ? "incorrect"
                  : ""
              }
            `}
            >
              {option}
            </button>
          ))}
      </div>
      <div className="timer">
        <p>{`Time left: ${timer} seconds`}</p>
      </div>
      <div className="navigation-buttons" style={{display:"flex", width:"93%", margin:"auto", gap:"80%"}}>
        <button
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>
        {currentQuestionIndex < questions.length - 1 ? (
          <button onClick={handleNextQuestion}>Next</button>
        ) : (
          <button onClick={handleSubmitQuiz}>Submit</button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
