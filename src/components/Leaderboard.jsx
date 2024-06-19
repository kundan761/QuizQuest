// import "../Styles/Leaderboard.css";
// import  { useState, useEffect, useContext } from 'react';
// import { QuizContext } from "../context/QuizContext";

// const Leaderboard = () => {
//   const { quizState } = useContext(QuizContext);
//   const { name, score } = quizState;
//   const [leaderboard, setLeaderboard] = useState([]);

//   useEffect(() => {
//     const user = { name, score };
//     const storedLeaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
//     const updatedLeaderboard = [...storedLeaderboard, user].sort((a, b) => b.score - a.score);
//     localStorage.setItem('leaderboard', JSON.stringify(updatedLeaderboard));
//     setLeaderboard(updatedLeaderboard);
//   }, [name, score]);

//   return (
//     <div className="leaderboard">
//       <h2>Leaderboard</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Score</th>
//           </tr>
//         </thead>
//         <tbody>
//           {leaderboard.map((user, index) => (
//             <tr key={index}>
//               <td>{user.name}</td>
//               <td>{user.score}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Leaderboard;



import { useState, useEffect, useContext } from 'react';
import { QuizContext } from '../context/QuizContext';
import '../Styles/Leaderboard.css';

const Leaderboard = () => {
  const { quizState } = useContext(QuizContext);
  const { name, score } = quizState;
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const user = { name, score };
    const storedLeaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    
    // Check if the user is already in the leaderboard
    const index = storedLeaderboard.findIndex(entry => entry.name === user.name);
    
    if (index !== -1) {
      // If user exists, update their score
      storedLeaderboard[index].score = user.score;
    } else {
      // Otherwise, add them to the leaderboard
      storedLeaderboard.push(user);
    }
    
    // Sort the leaderboard based on score
    const updatedLeaderboard = storedLeaderboard.sort((a, b) => b.score - a.score);
    localStorage.setItem('leaderboard', JSON.stringify(updatedLeaderboard));
    setLeaderboard(updatedLeaderboard);
  }, [name, score]); // Only update when score changes

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
