// eslint-disable-next-line no-unused-vars
import React from "react";
import { Route, Routes } from "react-router-dom";
import SetupQuiz from "../components/SetupQuiz";
import Quiz from "../components/Quiz";
import Leaderboard from "../components/Leaderboard";

const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SetupQuiz/>} />
        <Route path="/quiz" element={<Quiz/>} />
        <Route path="/leaderboard" element={<Leaderboard/>} />
      </Routes>
    </div>
  );
};

export default Router;
