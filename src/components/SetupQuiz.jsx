import  { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizContext } from '../context/QuizContext';
import '../Styles/SetupQuiz.css';


const SetupQuiz = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [numQuestions, setNumQuestions] = useState('');
  const navigate = useNavigate();
  const { setQuizState } = useContext(QuizContext);

  const startQuiz = () => {
    if (name && category && difficulty && numQuestions) {
      setQuizState({ name, category, difficulty, numQuestions, questions: [], score: 0 });
      navigate('/quiz');
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className="setup-quiz">
      <h1>Set up your Quiz</h1>
      <input type="text" placeholder="Enter Your Name" value={name} onChange={(e) => setName(e.target.value)} />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select Category</option>
        <option value="28">Art</option>
        <option value="25">Animals</option>
        <option value="29">Celebrities</option>
        <option value="22">Geography</option>
        <option value="9">General Knowledge</option>
        <option value="23">History</option>
        <option value="27">Mythology</option>
        <option value="24">Politcs</option>
        <option value="21">Sports</option>
        <option value="26">Science & Nature</option>
      </select>
      <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
        <option value="">Select Difficulty</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <input type="number" placeholder="Choose number of Questions" value={numQuestions} onChange={(e) => setNumQuestions(e.target.value)} />
      <button style={{backgroundColor:"#f50157"}} onClick={startQuiz}>START QUIZ</button>
    </div>
  );
};

export default SetupQuiz;
